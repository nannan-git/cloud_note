package com.oracle.hrb.dao;

import com.oracle.hrb.bean.Share;

import java.util.List;

public interface ShareDao {
    void add(Share share);
    List<Share> findLikeTitle(String title);
    Share findByNoteId(String noteId);
}
