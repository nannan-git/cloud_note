package com.oracle.hrb.dao;

import com.oracle.hrb.bean.ActivityNote;

import java.util.List;

public interface ActivityNoteDao {
    void add(ActivityNote activityNote);
    List<ActivityNote> findByActivityId(String id);
    ActivityNote findByActivityAndShareId(ActivityNote activityNote);
}
