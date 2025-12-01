package com.example.firstWebApp.controles;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RedirectController {

    @GetMapping("/")
    public String redirectToLogin() {
        // Opens login.html automatically
        return "redirect:/login.html";
    }
}
