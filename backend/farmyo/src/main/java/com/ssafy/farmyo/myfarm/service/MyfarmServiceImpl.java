package com.ssafy.farmyo.myfarm.service;

import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.common.s3.AwsS3Service;
import com.ssafy.farmyo.entity.Farm;
import com.ssafy.farmyo.entity.FarmImg;
import com.ssafy.farmyo.entity.Farmer;
import com.ssafy.farmyo.entity.User;
import com.ssafy.farmyo.myfarm.dto.*;
import com.ssafy.farmyo.myfarm.repository.MyfarmImageRepository;
import com.ssafy.farmyo.myfarm.repository.MyfarmRepository;
import com.ssafy.farmyo.user.repository.FarmerRepository;
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
    private final FarmerRepository farmerRepository;
    private final AwsS3Service awsS3Service;
    private final MyfarmImageRepository myfarmImageRepository;

    @Override
    public void createFarm(MyfarmReqDto myfarmReqDto) {
        String loginId = myfarmReqDto.getLoginId();

        User user = userRepository.findByLoginId(loginId).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));
        Farmer farmer = farmerRepository.getReferenceById(user.getId());

        if (user.getJob() != 0) { // 만약 농부가 아니면 예외처리
            throw new CustomException(ExceptionType.USER_NOT_FARMER);
        }
        String content = myfarmReqDto.getFarmContent();

        // 마이팜 생성
        Farm farm = Farm.builder()
                .content(content)
                .farmer(farmer)
                .build();
        myfarmRepository.save(farm);

        List<MyfarmImageDto> imageDto = myfarmReqDto.getMyfarmImageDtoList();

        // 보낸 사진의 수 만큼 farmImg 생성
        for (int i = 0; i < imageDto.size(); i++) {
            FarmImg farmImg = FarmImg.builder()
                    .farm(farm)
                    .imgOrder(imageDto.get(i).getOrder())
                    .imgUrl(awsS3Service.uploadFile(imageDto.get(i).getImage()))
                    .build();

            myfarmImageRepository.save(farmImg);
        }

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
        User user;

        if (userRepository.findByLoginId(loginId).isPresent()) {
            user =  userRepository.findByLoginId(loginId).get();

            if (user.getAddress() == null) {
                throw new CustomException(ExceptionType.ADDRESS_NOT_EXIST);
            }

        } else {
            throw new CustomException(ExceptionType.USER_NOT_EXIST);
        }


        return UpUserDto.builder()
                .job(user.getJob())
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
