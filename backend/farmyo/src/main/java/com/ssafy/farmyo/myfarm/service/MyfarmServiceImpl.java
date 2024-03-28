package com.ssafy.farmyo.myfarm.service;

import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.entity.Farm;
import com.ssafy.farmyo.entity.User;
import com.ssafy.farmyo.myfarm.dto.MyfarmDto;
import com.ssafy.farmyo.myfarm.dto.MyfarmListDto;
import com.ssafy.farmyo.myfarm.dto.UpUserDto;
import com.ssafy.farmyo.myfarm.repository.MyfarmRepository;
import com.ssafy.farmyo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class MyfarmServiceImpl implements MyfarmService {
    private final UserRepository userRepository;
    private final MyfarmRepository myfarmRepository;

    @Override
    public void createFarm() {

    }

    @Override
    public void updateFarm() {

    }

    @Override
    public void deleteFarm(int id) {

    }

    @Override
    @Transactional
    public UpUserDto getUpUser(String loginId) {
        User user =  userRepository.findByLoginId(loginId).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));

        return UpUserDto.builder()
                .userProfile(user.getProfile())
                .nickname(user.getNickname())
                .comment(user.getComment())
                .location(user.getAddress().getAddressLegal())
                .locationDetail(user.getAddress().getAddressDetail())
                .build();
    }

    @Override
    public MyfarmListDto getFarmList(int id) {
        User user =  userRepository.findById(id).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));
        if (user.getJob() != 0) {
            throw new CustomException(ExceptionType.USER_NOT_FARMER);
        }

        List<Farm> farmList = myfarmRepository.findAllByUserId(id);


        return null;
    }

    @Override
    public MyfarmDto getFarm(int id) {

        return null;
    }
}
