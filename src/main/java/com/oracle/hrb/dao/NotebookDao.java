package com.oracle.hrb.dao;

import com.oracle.hrb.bean.Notebook;

import java.util.List;


public interface NotebookDao {
    void add(Notebook notebook);
    void update(Notebook notebook);
    void delete(String id);
    List<Notebook> findByUserSpecial(String userId);
    List<Notebook> findByUserNormal(String userId);
}
