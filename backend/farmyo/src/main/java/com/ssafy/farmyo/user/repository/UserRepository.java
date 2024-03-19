package com.ssafy.farmyo.user.repository;

import com.ssafy.farmyo.entity.User;
import com.ssafy.farmyo.user.dto.UserDto;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository {

    User findById(int id);

}
