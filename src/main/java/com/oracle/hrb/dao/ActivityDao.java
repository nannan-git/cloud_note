package com.oracle.hrb.dao;

import com.oracle.hrb.bean.Activity;

import java.util.List;

public interface ActivityDao {
    List<Activity> findAll();
}
