package com.example.firstWebApp.repository;

import com.example.firstWebApp.entities.SudokuGame;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SudokuRepository extends JpaRepository<SudokuGame, Long> { }
