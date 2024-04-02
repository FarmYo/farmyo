package com.ssafy.farmyo.chat.dto;

import lombok.Data;
import java.util.List;

@Data
public class MessageListDto {
    private ChatDetailDto chatDetailDto;
    private List<MessageDetailDto> messageDetailDtoList;
}
