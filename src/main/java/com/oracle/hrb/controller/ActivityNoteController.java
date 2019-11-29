package com.oracle.hrb.controller;

import com.oracle.hrb.bean.User;
import com.oracle.hrb.service.ActivityNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/activityNote")
public class ActivityNoteController {
    @Autowired
    private ActivityNoteService activityNoteService;

    @PostMapping
    public boolean add(String activityId, String noteId, HttpSession session){
        User user =(User)session.getAttribute("user");
        return activityNoteService.addActivityNote(activityId,noteId,user.getName());
    }

    @GetMapping
    public Object list(String activityId){
        return  activityNoteService.activityNoteList(activityId);
    }
}
