package com.example.firstWebApp.controles;

import com.example.firstWebApp.entities.SudokuGame;
import com.example.firstWebApp.services.SudokuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sudoku")
@CrossOrigin("*")
public class SudokuController {
    @Autowired
    private SudokuService sudokuService;

    @PostMapping("/save")
    public SudokuGame save(@RequestBody SudokuGame game) {
        return sudokuService.save(game);
    }
}
