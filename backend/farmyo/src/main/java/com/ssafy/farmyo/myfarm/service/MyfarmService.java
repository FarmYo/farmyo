package com.ssafy.farmyo.myfarm.service;

import com.ssafy.farmyo.myfarm.dto.MyfarmDto;
import com.ssafy.farmyo.myfarm.dto.MyfarmListDto;
import com.ssafy.farmyo.myfarm.dto.MyfarmReqDto;
import com.ssafy.farmyo.myfarm.dto.UpUserDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MyfarmService {

    void createFarm(String loginId, String content, List<MultipartFile> files, List<Integer> orders);
    void updateFarm(int id, String content, int status, List<MultipartFile> files, List<Integer> orders);
    void deleteFarm(int id);
    UpUserDto getUpUser(String loginId);
    List<MyfarmListDto> getFarmList(String loginId);
    MyfarmReqDto getFarm(int id);

}
