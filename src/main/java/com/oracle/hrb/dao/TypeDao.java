package com.oracle.hrb.dao;

import com.oracle.hrb.bean.NotebookType;

import java.util.List;

public interface TypeDao {
    NotebookType findByNormal();
    List<NotebookType> findBySpecial();
}
