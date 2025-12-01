package com.example.firstWebApp.services;

import com.example.firstWebApp.entities.User;
import com.example.firstWebApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user) {
        if (userRepository.findByusername(user.getUsername()) != null) {
            return null;
        }
        return userRepository.save(user);
    }

    public User login(String Username, String password) {
        User user = userRepository.findByusername(Username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<User> getLeaderboard(String sortBy) {
        List<User> users = userRepository.findAll();

        users.sort((u1, u2) -> {
            switch (sortBy) {
                case "wins":
                    return Integer.compare(u2.getWins(), u1.getWins());
                case "bestScore":
                    return Integer.compare(u2.getBestScore(), u1.getBestScore());
                case "totalScore":
                default:
                    return Integer.compare(u2.getTotalScore(), u1.getTotalScore());
            }
        });

        return users;
    }

    public User saveGameResult(Long userId, int mistakes, int score, boolean win) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return null;

        user.setGames(user.getGames() + 1);
        user.setMistakes(user.getMistakes() + mistakes);

        if (win) {
            user.setWins(user.getWins() + 1);
            if (score > user.getBestScore()) {
                user.setBestScore(score);
            }
            user.setTotalScore(user.getTotalScore()+score);
        }

        return userRepository.save(user);
    }

}
