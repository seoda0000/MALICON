package io.openvidu.basic.java.controller;

import java.util.*;

import io.openvidu.basic.java.controller.exception.CustomException;
import io.openvidu.basic.java.dto.LiveRoomDto;
import io.openvidu.basic.java.dto.UserDto;
import io.openvidu.basic.java.dto.request.CreateRoomDto;
import io.openvidu.basic.java.dto.request.RoomUpdateDto;
import io.openvidu.basic.java.redis.entity.LiveRoomEntity;

import io.openvidu.basic.java.service.LiveRoomService;
import io.openvidu.basic.java.service.UserService;
import io.openvidu.basic.java.service.VideoService;
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
public class Controller {

	private final OpenVidu openvidu;

	private final UserService userService;

	private final LiveRoomService liveRoomService;

	private final VideoService videoService;


	//방 생성
	@PostMapping("/api/sessions") //
	public ResponseEntity<?> initializeSession(@RequestBody CreateRoomDto roomDto,
											   HttpServletRequest request)
			throws OpenViduJavaClientException, OpenViduHttpException {
		log.info("\n----------- initializeSession START -----------");

		// request header에 있는 토큰으로 유저정보 가져오기
		String accessToken = JwtUtil.getAccessTokenFromHeader(request);
		Long id = JwtUtil.getIdFromClaims(JwtUtil.parseClaims(accessToken));

		UserDto userInfo = userService.getUserById(id);

		log.info("유저 정보 : " + userInfo);

		// 바꿔야댐
		String sessionId = userInfo.getUserId() + "-" + UUID.randomUUID().toString();

		//session 생성
		//customSessionId => userId 가 들어있어야 한다.
		SessionProperties properties = new SessionProperties.Builder()
				.customSessionId(sessionId)
				.build();

		Session session = openvidu.createSession(properties);

		LiveRoomEntity room = liveRoomService.saveRoom(roomDto,userInfo, sessionId);

		if(session == null || room == null)
			throw new CustomException(HttpStatus.BAD_REQUEST , "방 생성 실패");

		LiveRoomDto liveRoomDto = LiveRoomDto.builder()
				.sessionId(sessionId)
				.title(room.getTitle())
				.startAt(room.getStartAt())
				.viewerNumber(1)
				.hashTag(room.getHashTag())
				.streamer(room.getStreamer())
				.thumbnail(room.getThumbnail())
				.build();
		return new ResponseEntity<>(liveRoomDto, HttpStatus.OK);
	}

	 //세션 토큰 가져오기!
	@PostMapping("/api/sessions/{sessionId}/connections")
	public ResponseEntity<?> createConnection(@PathVariable("sessionId") String sessionId,
											  HttpServletRequest request)
			throws OpenViduJavaClientException, OpenViduHttpException {

		log.info("\n----------- createconnection START -----------");
		log.info("url 패스에 들어있는 session Id : " + sessionId); // === 최초 title이랑 같음

		//이미 있는 세션을 sessionId를 통해 가져오게 된다.
		Session session = openvidu.getActiveSession(sessionId);

		//세션이 존재하지 않는다면 연결을 만들 수 없다.
		if (session == null || !liveRoomService.existBySessionId(sessionId))
			throw new CustomException(HttpStatus.NOT_FOUND, "방정보가 존재하지 않습니다.");

		ConnectionProperties properties;
		Connection connection;
		//연결과 토큰 만들기

		String accessToken = JwtUtil.getAccessTokenFromHeader(request);
		Long id = JwtUtil.getIdFromClaims(JwtUtil.parseClaims(accessToken));

		UserDto userInfo = userService.getUserById(id);

		// 로그인 된 userId와 sessionId가 같을 때
		if(sessionId.startsWith(userInfo.getUserId()+"-"))
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
	@GetMapping("/api/rooms")
	public ResponseEntity<?> getRoomList() throws Exception {
		log.info("방목록 시작-------------------------------------");
		List<LiveRoomDto> roomList = liveRoomService.getRoomList();
		log.info("방목록 끝-------------------------------------");
		return new ResponseEntity<>(roomList, HttpStatus.OK);
	}


	//방송 종료
	//세션 삭제, 영상 저장
	@DeleteMapping("/api/sessions/{sessionId}")
	@Transactional
	public ResponseEntity<?> deleteRoom(@PathVariable("sessionId") String sessionId,
										HttpServletRequest request) throws OpenViduJavaClientException, OpenViduHttpException {

		log.info("delete start!!");
		String accessToken = JwtUtil.getAccessTokenFromHeader(request);
		Long id = JwtUtil.getIdFromClaims(JwtUtil.parseClaims(accessToken));

		UserDto userInfo = userService.getUserById(id);

		// 방송을 킨사람만 삭제 가능
		if(!sessionId.startsWith(userInfo.getUserId()+"-"))
			throw new CustomException(HttpStatus.FORBIDDEN, "방송 정보를 삭제할 권한이 없습니다.");

		LiveRoomEntity liveRoomEntity = liveRoomService.findBySessionId(sessionId);

		String recordingId = liveRoomEntity.getRecordingId();
		if(recordingId == null) return ResponseEntity.internalServerError().build();
		// 녹화 저장
		Recording recording = openvidu.stopRecording(recordingId);
		if(recording == null
				|| !videoService.saveVideo(liveRoomEntity, recording, id))
			throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "녹화 저장 실패");

		// 세션 삭제
		if(!liveRoomService.deleteRoomBySessionId(sessionId))
			throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "세션 삭제 실패");

		// 세션 닫기
		Session session = openvidu.getActiveSession(sessionId);
		try{
			if(session != null) openvidu.getActiveSession(sessionId).close();
		}catch (OpenViduJavaClientException | OpenViduHttpException e){
			log.info("이미 세션이 종료돼서 없음");
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.noContent().build();
	}

	//방송 정보 수정, 여기서 썸네일 저장도 같이
	@PutMapping("/api/sessions/{sessionId}")
	public ResponseEntity<?> updateRoom(@PathVariable("sessionId") String sessionId,
										@RequestBody(required = false) RoomUpdateDto roomUpdateDto){

		log.info("----------- updateRoom START ----------- dto : " + roomUpdateDto.toString());

		if(!liveRoomService.updateRoom(sessionId, roomUpdateDto, null))
			throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "방송 정보 수정 실패");

		return new ResponseEntity<>(roomUpdateDto, HttpStatus.OK);
	}

	//현재 방송중인지 여부 확인
	@GetMapping("/api/sessions/onAir/{userId}")
	public ResponseEntity<?> isOnAir(@PathVariable String userId){

		log.info("\n----------- isOnAir START -----------");

		boolean onAir = false;

		String sessionId = userId;

		List<Session> sessionList = openvidu.getActiveSessions();

		for(Session session : sessionList) {
			if (session.getSessionId().startsWith(userId + "-")) {
				if (liveRoomService.existBySessionId(sessionId))
				{
					onAir = true;
					break;
				}
			}
		}

		return new ResponseEntity<>(onAir, HttpStatus.OK);
	}
}