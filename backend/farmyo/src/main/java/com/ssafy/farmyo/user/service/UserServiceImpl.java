package com.ssafy.farmyo.user.service;

import com.ssafy.farmyo.entity.Account;
import com.ssafy.farmyo.entity.Address;
import com.ssafy.farmyo.entity.User;
import com.ssafy.farmyo.entity.UserStatus;
import com.ssafy.farmyo.user.dto.JoinReqDto;
import com.ssafy.farmyo.user.repository.AddressRepository;
import com.ssafy.farmyo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    @Override
    public int join(JoinReqDto joinReqDto) {
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
    public int checkIdDuplicate(String id) {

        // 해당 아이디의 유저가 있다면 0(False) 반환
        if(userRepository.findByLoginId(id).isPresent()) return 0;

        return 1;
    }
}
