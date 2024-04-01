package com.ssafy.farmyo.chat.dto;

import lombok.Data;
import java.util.List;

@Data
public class MessageListDto {

    private int userId;
    private String userNickname;

    private List<MessageDetailDto> list;
}
