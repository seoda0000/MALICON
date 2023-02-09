package io.openvidu.basic.java.controller;

import io.openvidu.basic.java.dto.EmotionExpressionDto;
import io.openvidu.basic.java.service.EmotionExpressionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.Path;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/emotion/{sessionId}")
public class EmotionController {
    private final EmotionExpressionService emotionExpressionService;

    @PostMapping
    public ResponseEntity insertEmotionLog(@PathVariable String sessionId, @RequestBody EmotionExpressionDto emotionExpressionDto) {
        emotionExpressionService.write(sessionId, emotionExpressionDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity selectEmotionLog(@PathVariable String sessionId) {
        List<EmotionExpressionDto> result = emotionExpressionService.select(sessionId);

        return ResponseEntity.ok().body(result);
    }
}
