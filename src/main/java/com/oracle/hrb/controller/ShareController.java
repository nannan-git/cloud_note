package com.oracle.hrb.controller;

import com.oracle.hrb.bean.Share;
import com.oracle.hrb.bean.User;
import com.oracle.hrb.service.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/share")
public class ShareController {

    @Autowired
    private ShareService shareService;

    @PostMapping
    public boolean addShare(String noteId, HttpSession session){
        User user = (User)session.getAttribute("user");
       return shareService.addShare(noteId,user.getName());
    }

    @GetMapping
    public List<Share> shareList(String title){
        return shareService.shareList(title);
    }
}
