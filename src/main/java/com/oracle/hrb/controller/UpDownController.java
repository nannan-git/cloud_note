package com.oracle.hrb.controller;

import com.oracle.hrb.bean.UpDown;
import com.oracle.hrb.bean.User;
import com.oracle.hrb.service.UpDownService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/upDown")
public class UpDownController {

    @Autowired
   private UpDownService upDownService;

    @PostMapping
    public void changeState(UpDown upDown, HttpSession session){
        User user=(User)session.getAttribute("user");
        upDown.setUserId(user.getId());
        upDownService.state(upDown);
    }
}
