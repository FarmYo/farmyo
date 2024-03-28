package com.ssafy.farmyo.myfarm.service;

import com.ssafy.farmyo.myfarm.dto.MyfarmDto;
import com.ssafy.farmyo.myfarm.dto.MyfarmListDto;
import com.ssafy.farmyo.myfarm.dto.UpUserDto;

public interface MyfarmService {

    void createFarm();
    void updateFarm();
    void deleteFarm(int id);
    UpUserDto getUpUser(int id);
    MyfarmListDto getFarmList(int id);
    MyfarmDto getFarm(int id);

}
