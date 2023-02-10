package io.openvidu.basic.java.dto;


import io.openvidu.java.client.Recording;

//@Getter
//@Setter
public class RecordUrlDto {


    Recording recording;
    String url;

    public RecordUrlDto(Recording recording, String url) {
        super();
        this.recording = recording;
        this.url = url;
    }


}