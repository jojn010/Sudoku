package com.example.firstWebApp.controles;

import com.example.firstWebApp.entities.User;
import com.example.firstWebApp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody User user) {
        User created = userService.register(user);
        if (created == null) {
            return ResponseEntity.status(409).body("Email already exists");
        }
        return ResponseEntity.ok(created);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
        if (user == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<User>> getLeaderboard(@RequestParam(defaultValue = "totalScore") String sortBy) {
        return ResponseEntity.ok(userService.getLeaderboard(sortBy));
    }

    @PostMapping("/saveGame")
    public ResponseEntity<?> saveGame(@RequestParam Long userId,
                                      @RequestParam int mistakes,
                                      @RequestParam int score,
                                      @RequestParam boolean win
    ) {
        User updated = userService.saveGameResult(userId, mistakes, score, win);
        if (updated == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        return ResponseEntity.ok(updated);
    }

}
