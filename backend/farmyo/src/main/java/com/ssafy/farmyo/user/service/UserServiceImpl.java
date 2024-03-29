package com.ssafy.farmyo.user.service;

import com.ssafy.farmyo.common.exception.CustomException;
import com.ssafy.farmyo.common.exception.ExceptionType;
import com.ssafy.farmyo.entity.*;
import com.ssafy.farmyo.user.dto.*;
import com.ssafy.farmyo.user.openApi.OpenApiManager;
import com.ssafy.farmyo.user.repository.AddressRepository;
import com.ssafy.farmyo.user.repository.FarmerRepository;
import com.ssafy.farmyo.user.repository.FavoriteRepository;
import com.ssafy.farmyo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final FarmerRepository farmerRepository;
    private final AddressRepository addressRepository;
    private final FavoriteRepository favoriteRepository;
    private final OpenApiManager openApiManager;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    @Transactional
    public int customerJoin(JoinReqDto joinReqDto) {
        // 계좌 생성
        Account account = Account.builder()
                .accountBalance(0)
                .depositor(joinReqDto.getDepositor())
                .bankName(joinReqDto.getBank())
                .accountNumber(joinReqDto.getAccount())
                .build();

        // 유저 생성
        User user = User.builder()
                .loginId(joinReqDto.getLoginId())
                .password(bCryptPasswordEncoder.encode(joinReqDto.getPassword()))
                .telephone(joinReqDto.getTelephone())
                .nickname(joinReqDto.getNickname())
                .email(joinReqDto.getEmail())
                .job(joinReqDto.getJob())
                .status(UserStatus.ACTIVE)
                .account(account)
                .profile("기본 이미지 URL이 들어갈 자리입니다.")
                .comment("기본 메세지입니다.")
                .build();

        // 유저 저장
        User savedUser = userRepository.save(user);

        // 주소 생성
        Address address = Address.builder()
                .user(savedUser)
                .addressCode(joinReqDto.getAddressCode())
                .addressLegal(joinReqDto.getAddressLegal())
                .addressDetail(joinReqDto.getAddressDetail())
                .build();

        // 주소 저장
        addressRepository.save(address);

        // 식별 ID 값 반환
        return savedUser.getId();
    }

    @Override
    @Transactional
    public int farmerJoin(JoinReqDto joinReqDto) {

        // 만약 사업자 등록을 이미 했다면 예외 처리
//        if(farmerRepository.findByFarmerLicense(joinReqDto.getLicenseNum()).isPresent()) throw new CustomException(ExceptionType.DUPLICATE_BUSINESS_LICENSE);

        // 사업자 공공 API 불러오기
        openApiManager.validateLicense(joinReqDto.getLicenseNum() ,joinReqDto.getRepresentative(), joinReqDto.getStartDate());

        // 계좌 생성
        Account account = Account.builder()
                .accountBalance(0)
                .depositor(joinReqDto.getDepositor())
                .bankName(joinReqDto.getBank())
                .accountNumber(joinReqDto.getAccount())
                .build();

        log.info("{}", joinReqDto.getLicenseNum());

        // 농부 생성
        Farmer farmer = Farmer.farmerBuilder()
                .loginId(joinReqDto.getLoginId())
                .password(bCryptPasswordEncoder.encode(joinReqDto.getPassword()))
                .telephone(joinReqDto.getTelephone())
                .nickname(joinReqDto.getNickname())
                .email(joinReqDto.getEmail())
                .job(joinReqDto.getJob())
                .status(UserStatus.ACTIVE)
                .account(account)
                .profile("기본 이미지 URL이 들어갈 자리입니다.")
                .comment("기본 메세지입니다.")
                .farmerLicense(joinReqDto.getLicenseNum())
                .build();

        // 농부 저장
        Farmer savedFarmer = farmerRepository.save(farmer);

        Address address = Address.builder()
                .user(savedFarmer)
                .addressLegal(joinReqDto.getAddressLegal())
                .addressCode(joinReqDto.getAddressCode())
                .addressDetail(joinReqDto.getAddressDetail())
                .build();

        addressRepository.save(address);

        // 식별 ID 값 반환
        return savedFarmer.getId();
    }

    @Override
    public int checkIdDuplicate(String id) {

        // 해당 아이디의 유저가 있다면 0(False) 반환
        if(userRepository.findByLoginId(id).isPresent()) throw new CustomException(ExceptionType.DUPLICATE_LOGIN_ID);

        return 1;
    }

    @Override
    public UserResDto getUserInfo(int id) {

        // 회원 정보 return
        return userRepository.getUserInfoById(id);
    }

    @Override
    @Transactional
    public void resetPassword(PasswordResetDto passwordResetDto) {

        // 비밀번호를 바꾸고자 하는 유저의 엔티티를 가져옴
        User user = userRepository.findByEmail(passwordResetDto.getEmail()).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));

        // 해당 비밀번호 수정 (Dirty Checking)
        user.updatePassword(bCryptPasswordEncoder.encode(passwordResetDto.getPassword()));

    }

    @Override
    @Transactional
    public void updatePassword(int id, PasswordUpdateDto passwordUpdateDto) {

        // 비밀번호를 바꾸고자 하는 유저의 엔티티를 가져옴
        User user = userRepository.findById(id).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));

        // 비밀번호 확인
        if(!bCryptPasswordEncoder.matches(passwordUpdateDto.getPastPassword(), user.getPassword())) throw new CustomException(ExceptionType.PASSWORD_NOT_MATCH);

        // 해당 비밀번호 수정 (Dirty Checking)
        user.updatePassword(bCryptPasswordEncoder.encode(passwordUpdateDto.getNewPassword()));
    }

    @Override
    @Transactional
    public void modifyUserInfo(int id, UserModifyDto userModifyDto) {

        // 비밀번호를 바꾸고자 하는 유저의 엔티티를 가져옴
        User user = userRepository.findById(id).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));

        // 유저 기본 정보 수정 (닉네임, 전화번호, 상태 메세지)
        user.updateAll(userModifyDto.getNickname(), userModifyDto.getTelephone(), userModifyDto.getComment());
    }

    @Override
    @Transactional
    public void deactivateUser(int id) {

        User user = userRepository.findById(id).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));

        user.updateStatus(UserStatus.WITHDRAWN);

    }

    @Override
    @Transactional
    public void modifyAccountInfo(int id, AccountModifyDto accountModifyDto) {

        // 계좌 바꾸고자 하는 유저의 엔티티를 가져옴
        User user = userRepository.findById(id).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));

        // 계좌 수정
        user.getAccount().updateAll(accountModifyDto.getDepositor(), accountModifyDto.getBank(), accountModifyDto.getAccount());
    }



    @Override
    @Transactional
    public void modifyAddressInfo(int id, AddressModifyDto addressModifyDto) {

        // 주소를 바꾸고자 하는 유저의 엔티티를 가져옴
        User user = userRepository.findById(id).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));

        // 주소 수정
        Address address = user.getAddress();
        address.updateAll(addressModifyDto.getAddressCode(), addressModifyDto.getAddressLegal(), addressModifyDto.getAddressDetail());
    }
    

    @Override
    @Transactional
    public void addBookmark(int userId, int farmerId) {
        // 이미 즐겨찾기가 있다면 예외 처리
        if (favoriteRepository.checkFavoriteExistence(userId, farmerId).isPresent()) {
            throw new CustomException(ExceptionType.ALREADY_EXIST_FAVORITE);
        }
        ;

        // 현재 로그인한 유저 엔티티 조회
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ExceptionType.USER_NOT_EXIST));

        // 즐겨찾기한 농부 엔티티 조회
        Farmer farmer = farmerRepository.findById(farmerId).orElseThrow(() -> new CustomException(ExceptionType.FARMER_NOT_EXIST));

        // 즐겨찾기 엔티티 생성
        Favorite favorite = Favorite.builder()
                .user(user)
                .farmer(farmer)
                .build();

        // 즐겨찾기 엔티티 저장
        favoriteRepository.save(favorite);
    }

    @Override
    @Transactional
    public void removeBookmark(int userId, int bookmarkId) {

        Favorite favorite = favoriteRepository.findById(bookmarkId).orElseThrow(() -> new CustomException(ExceptionType.NOT_EXIST_FAVORITE));

        if (!(favorite.getUser().getId() == userId)) throw new CustomException(ExceptionType.INVALID_ACCESS_FAVORITE);

        favoriteRepository.delete(favorite);
    }

    @Override
    public List<BookmarkResDto> getBookmarkList(int userId) {
        return favoriteRepository.getCustomerBookmarkList(userId);
    }
}
