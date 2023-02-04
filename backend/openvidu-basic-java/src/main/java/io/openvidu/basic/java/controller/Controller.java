package io.openvidu.basic.java.controller;

import java.time.LocalDateTime;
import java.util.*;

import io.openvidu.basic.java.redis.dto.LiveRoomDto;
import io.openvidu.basic.java.redis.dto.UserDto;
import io.openvidu.basic.java.redis.entity.LiveRoomEntity;
import io.openvidu.basic.java.redis.repository.LiveRoomRepository;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@Slf4j
public class Controller {

	private final OpenVidu openvidu;

	private final LiveRoomRepository liveRoomRepository;//openvidu 서버와 연결해 놓은 코드

	//방 생성
	@PostMapping("/api/sessions")
	public ResponseEntity<?> initializeSession(@RequestBody(required = false) Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
		log.info("\n----------- initializeSession START -----------");
		showParams(params);


		//session 생성
		//customSessionId === userId 가 들어있어야 한다.
		SessionProperties properties = SessionProperties.fromJson(params).build();
		Session session = openvidu.createSession(properties);


		//파라미터 정보 출력
		//{title:"방제", customSessionId:"유저아이디1", avatar:jsonStringify, nickName: "닉네임"}
		String sessionId = session.getSessionId();
		log.info("sessionId : " + sessionId);
		String title = (String)params.get("title");
		String userId = (String)params.get("customSessionId");
		String avatar = (String)params.get("avatar");
		String nickName = (String)params.get("nickName");
		String date = LocalDateTime.now().toString();


		//UserDto 생성
		UserDto userDto = UserDto.builder()
				.avatar(avatar)
				.userId(userId)
				.nickName(nickName)
				.build();


		//LiveRoomEntity 생성
		LiveRoomEntity liveRoomEntity = LiveRoomEntity.builder()
				.title(title)
				.streamer(userDto)
				.startAt(date)
				.sessionId(sessionId)
				.build();


		// redis에 저장
		liveRoomRepository.save(liveRoomEntity);

		// entity => dto 변환
		LiveRoomDto liveRoomDto = entityToDto(liveRoomEntity);

		log.info("liveRoomEntity1 : "+ liveRoomEntity); // 가져온 방 정보뽑아보기

		return new ResponseEntity<>(liveRoomDto, HttpStatus.OK);
	}





	 //세션 토큰 가져오기
	@PostMapping("/api/sessions/{sessionId}/connections")
	public ResponseEntity<?> createConnection(@PathVariable("sessionId") String sessionId, @RequestBody(required = false) Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {

		//접속하려고 하는 유저의 아이디
		String userId = (String)params.get("userId");
//		String sessionId = (String)params.get("sessionId");

		log.info("\n----------- createconnection START -----------");
		showParams(params);

		//이미 있는 세션을 sessionId를 통해 가져오게 된다.
		//여기서 말하는 sessionId는 스트리머의 userId 이다. (title이랑은 별개임)
		Session session = openvidu.getActiveSession(sessionId);

		//세션이 존재하지 않는다면 연결을 만들 수 없다.
		if (session == null) {
			log.info("check1");
			return new ResponseEntity<>("session not found",HttpStatus.NOT_FOUND);
		}

		//redis에 세션정보가 존재하지 않는다면 연결을 만들 수 없다.
		if(!liveRoomRepository.existsById(sessionId)){
			log.info("check2");
			return new ResponseEntity<>("session not found", HttpStatus.NOT_FOUND);
		}


		//스트리머가 재접속 한다면 pulisher의 권한을 준다.
		if(userId.equals(liveRoomRepository.findById(sessionId).orElseThrow(() -> new RuntimeException("찾는거 없지롱")).getSessionId())){
			ConnectionProperties properties = ConnectionProperties.fromJson(params).role(OpenViduRole.PUBLISHER).build();
			Connection connection = session.createConnection(properties);
			log.info("check3");
			return new ResponseEntity<>(connection, HttpStatus.OK);
		}

		//시청자가 접속하는거라면 subscriber의 권한을 준다.
		ConnectionProperties properties = ConnectionProperties.fromJson(params).role(OpenViduRole.SUBSCRIBER).build();
		Connection connection = session.createConnection(properties);
		log.info("check4");
		return new ResponseEntity<>(connection, HttpStatus.OK);
	}





	//방목록 가져오기
	@PostMapping("api/rooms")
	public ResponseEntity<?> getRoomList() throws Exception {

		log.info("\n----------- getRoomList START -----------");


		log.info("방목록 시작-------------------------------------");

		//반환할 배열 생성
		List<LiveRoomDto> roomList = new ArrayList<LiveRoomDto>();

		//모든 라이브방 목록 저장
		liveRoomRepository.findAll().forEach((room)->{
			log.info(room.toString()); //잘 나왔는지 출력해보기
			roomList.add(entityToDto(room));
		});

		log.info("방목록 끝-------------------------------------");

		return new ResponseEntity<>(roomList, HttpStatus.OK);
	}





	//방송 종료 -> redis에 저장된 방 삭제
	@DeleteMapping("api/sessions/{sessionId}")
	public ResponseEntity<?> deleteRoom(@PathVariable("sessionId") String sessionId) throws Exception{

		log.info("\n----------- deleteRoom START -----------");

		liveRoomRepository.deleteById(sessionId);
		String result = sessionId + " is deleted.";
		log.info(result);
		openvidu.getActiveSession(sessionId).close();
		return new ResponseEntity<>(result, HttpStatus.OK);
	}





	//방송 정보 수정(방제 변경)
	@PutMapping("api/sessions")
	public ResponseEntity<?> updateRoom(@RequestBody(required = false) Map<String, Object> params){

		log.info("\n----------- updateRoom START -----------");

		showParams(params);

		String title = (String)params.get("title");
		String sessionId = (String)params.get("sessionId");

		//찾고자 하는 세션이 없다면
		if(!liveRoomRepository.existsById(sessionId)){
			return new ResponseEntity<>("session not found", HttpStatus.NOT_FOUND);
		}


		//세션찾아서 이름변경
		LiveRoomEntity liveRoomEntity = liveRoomRepository.findById(sessionId).get();
		liveRoomEntity.setTitle(title);
		liveRoomRepository.save(liveRoomEntity);


		//변경된 타이틀 반환
		return new ResponseEntity<>(title, HttpStatus.OK);
	}






	//현제 방송중인지 여부 확인
	@GetMapping("api/sessions/onAir")
	public ResponseEntity<?> isOnAir(@RequestBody(required = false) Map<String, Object> params){

		log.info("\n----------- isOnAir START -----------");

		boolean onAir = true;

		String sessionId = (String)params.get("userId");
		if(!liveRoomRepository.existsById(sessionId)) onAir = false;

		return new ResponseEntity<>(onAir, HttpStatus.OK);
	}





	//썸네일 저장하기
	@PutMapping("api/sessions/thumbnail/{sessionId}")
	public ResponseEntity<?> saveThumbnail(@PathVariable("sessionId") String sessionId , @RequestBody(required = false) Map<String, Object> params){

		log.info("\n----------- saveThumbnail START -----------");
		showParams(params);

		//session이 없을경우
		if(!liveRoomRepository.existsById(sessionId)){
			return new ResponseEntity<>("session not found", HttpStatus.NOT_FOUND);
		}


		//session에 thumbnail 저장
		LiveRoomEntity liveRoomEntity = liveRoomRepository.findById(sessionId).get();
		liveRoomEntity.setThumbnail((String)params.get("thumbnail"));
		liveRoomRepository.save(liveRoomEntity);

		return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
	}





	//	parmas로 넘어온 값 뽑아보는 함수
	public void showParams(Map<String, Object> params){
		Iterator<String> keys = params.keySet().iterator();
		log.info(" params start ---------------");
		while( keys.hasNext()){
			String key = keys.next();
			log.info( String.format("[ 키 : %s, 값 : %s ]", key, String.valueOf(params.get(key))) );
		}
		log.info(" params end ---------------");
	}




	// LiveRoomEntity 를 LiveRoomDto로 변경시켜 주는 코드
	// 둘의 차이는 viewerNumber 하나 뿐임
	public LiveRoomDto entityToDto (LiveRoomEntity liveRoomEntity){

		String title = liveRoomEntity.getTitle();
		String startAt = liveRoomEntity.getStartAt();
		String thumbnail = liveRoomEntity.getThumbnail();
		String sessionId = liveRoomEntity.getSessionId();
		UserDto streamer = liveRoomEntity.getStreamer();
		int viewerNumber = openvidu.getActiveSession(sessionId).getActiveConnections().size();

		LiveRoomDto liveRoomDto = LiveRoomDto.builder()
				.title(title)
				.streamer(streamer)
				.sessionId(sessionId)
				.viewerNumber(viewerNumber)
				.startAt(startAt)
				.thumbnail(thumbnail)
				.build();

		return liveRoomDto;
	}



}