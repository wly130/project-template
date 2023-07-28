package com.spring.test.controller;

import com.spring.test.entity.Word;
import com.spring.test.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "/word")
public class WordController {
    @Autowired
    private WordService wordService;

    @GetMapping(value = "/getWord")
    public Map<String, Object> getWord(String text, int page, int pageNum, int type) {
        return wordService.getWord(text, page, pageNum, type);
    }

    @PostMapping(value = "/addWord")
    public Map<String, Object> addWord(@RequestBody Word word) {
        return wordService.addWord(word);
    }
}
