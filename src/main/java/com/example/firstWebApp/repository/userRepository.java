package com.example.firstWebApp.repository;

import com.example.firstWebApp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByusername(String username);
}
