package com.oracle.hrb.service;

import com.oracle.hrb.bean.ActivityNote;
import com.oracle.hrb.bean.Share;
import com.oracle.hrb.dao.ActivityNoteDao;
import com.oracle.hrb.dao.ShareDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ActivityNoteService {
    @Autowired
    private ActivityNoteDao activityNoteDao;
    @Autowired
    private ShareService shareService;

    @Transactional
    public boolean addActivityNote(String activityId,String noteId,String userName){
        ActivityNote an = new ActivityNote();
        an.setActivityId(activityId);
        if(shareService.findByNoteId(noteId)==null){
           boolean b = shareService.addShare(noteId,userName);
           if(b==false){
               return false;
           }
        }
        Share share = shareService.findByNoteId(noteId);
        an.setShare(share);
        ActivityNote activityNote = activityNoteDao.findByActivityAndShareId(an);
        if(activityNote !=null){
            return false;
        }
        an.setId(UUID.randomUUID().toString());
        activityNoteDao.add(an);
        return true;
    }

    @Transactional
    public List<ActivityNote> activityNoteList(String activityId){
        return activityNoteDao.findByActivityId(activityId);
    }
}
