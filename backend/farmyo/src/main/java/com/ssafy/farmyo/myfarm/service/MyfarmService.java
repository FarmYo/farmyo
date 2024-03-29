package com.ssafy.farmyo.myfarm.service;

import com.ssafy.farmyo.myfarm.dto.MyfarmDto;
import com.ssafy.farmyo.myfarm.dto.MyfarmListDto;
import com.ssafy.farmyo.myfarm.dto.MyfarmReqDto;
import com.ssafy.farmyo.myfarm.dto.UpUserDto;

public interface MyfarmService {

    void createFarm(MyfarmReqDto myfarmReqDto);
    void updateFarm();
    void deleteFarm(int id);
    UpUserDto getUpUser(String loginId);
    MyfarmListDto getFarmList(int id);
    MyfarmDto getFarm(int id);

}
