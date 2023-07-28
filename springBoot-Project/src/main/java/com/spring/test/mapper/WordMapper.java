package com.spring.test.mapper;

import com.spring.test.entity.Word;

import java.util.List;

public interface WordMapper {
    List<Word> getWord(String text, int startPage, int pageNum, int type);

    int getWordCount(String text, int type);

    int addWord(Word word);
}
