package com.oracle.hrb.service;

import com.oracle.hrb.bean.Activity;
import com.oracle.hrb.dao.ActivityDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ActivityService {
    @Autowired
    private ActivityDao activityDao;

    @Transactional
    public List<Activity> activityList(){
        return activityDao.findAll();
    }
}
