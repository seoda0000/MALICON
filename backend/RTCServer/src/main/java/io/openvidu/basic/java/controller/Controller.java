package io.openvidu.basic.java.controller;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import io.openvidu.basic.java.controller.exception.CustomException;
import io.openvidu.basic.java.dto.LiveRoomDto;
import io.openvidu.basic.java.dto.UserDto;
import io.openvidu.basic.java.dto.request.CreateRoomDto;
import io.openvidu.basic.java.dto.request.StopRecordDto;
import io.openvidu.basic.java.redis.entity.LiveRoomEntity;
import io.openvidu.basic.java.redis.entity.PreviousVideoEntity;
import io.openvidu.basic.java.redis.entity.UserEntity;
import io.openvidu.basic.java.redis.repository.LiveRoomRepository;
import io.openvidu.basic.java.redis.repository.PreviousVideoRepository;
import io.openvidu.basic.java.redis.repository.UserEntityRepository;
import io.openvidu.basic.java.util.JwtUtil;

import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@Slf4j
@Transactional
public class Controller {

	private final OpenVidu openvidu;

	private final LiveRoomRepository liveRoomRepository;

	private final UserEntityRepository userEntityRepository;


	//방 생성
	@PostMapping("/api/sessions") //
	public ResponseEntity<?> initializeSession(@RequestBody CreateRoomDto roomDto,
											   HttpServletRequest request)
			throws OpenViduJavaClientException, OpenViduHttpException {
		log.info("\n----------- initializeSession START -----------");

		// request header에 있는 토큰으로 유저정보 가져오기
		String accessToken = JwtUtil.getAccessTokenFromHeader(request);
		Long id = JwtUtil.getIdFromClaims(JwtUtil.parseClaims(accessToken));

		UserEntity userInfo = userEntityRepository.findById(id).orElseThrow(
				()->new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 아이디입니다.")
		);

		log.info("유저 정보 : " + userInfo);

		//session 생성
		//customSessionId => userId 가 들어있어야 한다.
		SessionProperties properties = SessionProperties.fromJson(Map.of("customSessionId", userInfo.getUserId())).build();
		Session session = openvidu.createSession(properties);

		//파라미터 정보 출력
		//{title:"방제"}
		// userId로 sessionId 설정
		String sessionId = session.getSessionId();
		String title = roomDto.getTitle();
		String hashTag = roomDto.getHashTag();
		LocalDateTime date = LocalDateTime.now();

		//LiveRoomEntity 생성
		LiveRoomEntity liveRoomEntity = LiveRoomEntity.builder()
				.title(title)
				.streamer(UserDto.builder()
						.avatar(userInfo.getAvatar())
						.nickName(userInfo.getNickName())
						.userId(userInfo.getUserId()).build())
				.startAt(date.toString())
				.sessionId(sessionId)
				.hashTag(hashTag)
				.build();

		//redis에 저장
		liveRoomRepository.save(liveRoomEntity);
		LiveRoomDto liveRoomDto = entityToDto(liveRoomEntity);
		log.info("liveRoomEntity1 : "+ liveRoomEntity); // 가져온 방 정보뽑아보기

		return new ResponseEntity<>(liveRoomDto, HttpStatus.OK);
	}

	 //세션 토큰 가져오기!
	@Transactional(readOnly = true)
	@PostMapping("/api/sessions/{sessionId}/connections")
	public ResponseEntity<?> createConnection(@PathVariable("sessionId") String sessionId,
											  HttpServletRequest request)
			throws OpenViduJavaClientException, OpenViduHttpException {

		log.info("\n----------- createconnection START -----------");
		log.info("url 패스에 들어있는 session Id : " + sessionId); // === 최초 title이랑 같음

		//이미 있는 세션을 sessionId를 통해 가져오게 된다.
		Session session = openvidu.getActiveSession(sessionId);

		//세션이 존재하지 않는다면 연결을 만들 수 없다.
		if (session == null || !liveRoomRepository.existsById(sessionId))
			throw new CustomException(HttpStatus.NOT_FOUND, "방정보가 존재하지 않습니다.");

		ConnectionProperties properties;
		Connection connection;
		//연결과 토큰 만들기

		String accessToken = JwtUtil.getAccessTokenFromHeader(request);
		Long id = JwtUtil.getIdFromClaims(JwtUtil.parseClaims(accessToken));

		UserEntity userInfo = userEntityRepository.findById(id).orElseThrow(
				()->new CustomException(HttpStatus.NOT_FOUND, "존재하지 않는 아이디입니다.")
		);

		// 로그인 된 userId와 sessionId가 같을 때
		if(userInfo.getUserId().equals(sessionId))
		{
			properties = new ConnectionProperties.Builder().role(OpenViduRole.PUBLISHER).build();
			connection = session.createConnection(properties);
		}else {
			properties = new ConnectionProperties.Builder().role(OpenViduRole.SUBSCRIBER).build();
			connection = session.createConnection(properties);
		}
		return new ResponseEntity<>(connection, HttpStatus.OK);
	}


	//방목록 가져오기
	@Transactional(readOnly = true)
	@GetMapping("/api/rooms")
	public ResponseEntity<?> getRoomList() throws Exception {
		log.info("방목록 시작-------------------------------------");

		//반환할 배열 생성
		List<LiveRoomDto> roomList = new ArrayList<>();

		//모든 라이브방 목록 저장
		Iterator<LiveRoomEntity> it = liveRoomRepository.findAll().iterator();

		while(it.hasNext()){
			roomList.add(entityToDto(it.next()));
		}

		log.info("방목록 끝-------------------------------------");

		return new ResponseEntity<>(roomList, HttpStatus.OK);
	}


	//방송 종료 -> redis에 저장된 방 삭제
	@DeleteMapping("/api/sessions/{sessionId}")
	public ResponseEntity<?> deleteRoom(@PathVariable("sessionId") String sessionId) throws Exception{

		log.info("\n----------- deleteRoom START -----------");

		liveRoomRepository.deleteById(sessionId);
		String result = sessionId + "is deleted.";
		log.info(result);
		try{
			openvidu.getActiveSession(sessionId).close();
		}catch (OpenViduJavaClientException | OpenViduHttpException e){
			log.info("이미 세션이 종료돼서 없음");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	//방송 정보 수정(방제 변경)
	@PutMapping("/api/sessions")
	public ResponseEntity<?> updateRoom(@RequestBody(required = false) Map<String, Object> params){

		log.info("\n----------- updateRoom START -----------");

		String title = (String)params.get("title");
		String sessionId = (String)params.get("sessionId");

		LiveRoomEntity liveRoomEntity = liveRoomRepository.findById(sessionId).get();
		liveRoomEntity.setTitle(title);
		liveRoomRepository.save(liveRoomEntity);

		return new ResponseEntity<>(title, HttpStatus.OK);
	}

	//현재 방송중인지 여부 확인
	@Transactional(readOnly = true)
	@GetMapping("/api/sessions/onAir/{userId}")
	public ResponseEntity<?> isOnAir(@PathVariable String userId){

		log.info("\n----------- isOnAir START -----------");

		boolean onAir = true;

		String sessionId = userId;

		Session session = openvidu.getActiveSession(sessionId);

		if(!liveRoomRepository.existsById(sessionId) || session == null) onAir = false;

		return new ResponseEntity<>(onAir, HttpStatus.OK);
	}

	//썸네일 저장하기
	@PostMapping("/api/sessions/thumbnail/{sessionId}")
	public ResponseEntity<?> saveThumbnail(@PathVariable("sessionId") String sessionId , @RequestBody(required = false) Map<String, Object> params){

		log.info("\n----------- saveThumbnail START -----------");

		//session이 없을경우
		if(openvidu.getActiveSession(sessionId) == null)
			throw new CustomException(HttpStatus.NOT_FOUND, "썸네일을 저장할 세션이 없습니다.");

		//session에 thumbnail 저장
		LiveRoomEntity liveRoomEntity = liveRoomRepository.findById(sessionId).orElseThrow(
				()->new CustomException(HttpStatus.NOT_FOUND, "썸네일을 저장할 방송이 없습니다.")
		);
		liveRoomEntity.setThumbnail((String)params.get("thumbnail"));
		liveRoomRepository.save(liveRoomEntity);

		return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
	}


	public void showParams(Map<String, Object> params){
		//map으로 받아오는 값을 뽑아보는 코드
		Iterator<String> keys = params.keySet().iterator();
		log.info(" params start ---------------");
		while( keys.hasNext()){
			String key = keys.next();
			log.info( String.format("키 : %s, 값 : %s", key, String.valueOf(params.get(key))) );
		}
		log.info(" params end ---------------");
	}


	public LiveRoomDto entityToDto (LiveRoomEntity liveRoomEntity) throws OpenViduJavaClientException, OpenViduHttpException {

		String title = liveRoomEntity.getTitle();
		String startAt = liveRoomEntity.getStartAt();
		String thumbnail = liveRoomEntity.getThumbnail();
		String sessionId = liveRoomEntity.getSessionId();
		UserDto streamer = liveRoomEntity.getStreamer();
		String hashTag = liveRoomEntity.getHashTag();
		Session ActiveSession = openvidu.getActiveSession(sessionId);
		int viewerNumber = -31;
		if(ActiveSession != null){
			ActiveSession.fetch();
			viewerNumber = ActiveSession.getConnections().size();
		}

		LiveRoomDto liveRoomDto = LiveRoomDto.builder()
				.title(title)
				.streamer(streamer)
				.sessionId(sessionId)
				.viewerNumber(viewerNumber)
				.startAt(startAt)
				.thumbnail(thumbnail)
				.hashTag(hashTag)
				.build();

		return liveRoomDto;
	}




}