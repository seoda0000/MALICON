package com.blahblah.web.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class HashTag {
    private int key;
    private String label;
    private boolean selected;
}
