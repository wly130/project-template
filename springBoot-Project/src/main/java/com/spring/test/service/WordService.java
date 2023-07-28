package com.spring.test.service;

import com.spring.test.entity.Word;
import com.spring.test.mapper.WordMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WordService {
    @Autowired
    private WordMapper wordMapper;

    /**
     * 获取单词列表
     *
     * @param text    关键字
     * @param page    当前页
     * @param pageNum 每页个数
     * @param type    搜索类型
     * @return
     */
    public Map<String, Object> getWord(String text, int page, int pageNum, int type) {
        int startPage = (page - 1) * pageNum;
        String key = text + "%";
        List<Word> list = wordMapper.getWord(key, startPage, pageNum, type);
        int count = wordMapper.getWordCount(key, type);

        Map<String, Object> result = new HashMap<>();
        result.put("id", 1);
        result.put("count", count);
        result.put("list", list);
        return result;
    }

    public Map<String, Object> addWord(Word word) {
        Map<String, Object> result = new HashMap<>();
        if (wordMapper.addWord(word) > 0) {
            result.put("id", 1);
            result.put("msg", "添加成功");
        }
        return result;
    }
}
