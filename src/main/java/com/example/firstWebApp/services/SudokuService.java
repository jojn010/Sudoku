package com.example.firstWebApp.services;

import com.example.firstWebApp.entities.SudokuGame;
import com.example.firstWebApp.repository.SudokuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SudokuService {
    @Autowired
    private SudokuRepository sudokuRepository;

    public SudokuGame save(SudokuGame game) {
        return sudokuRepository.save(game);
    }
}
