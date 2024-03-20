package com.ssafy.farmyo.user.repository;

import com.ssafy.farmyo.entity.User;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findById(int id);


}
