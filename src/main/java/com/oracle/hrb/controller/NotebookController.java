package com.oracle.hrb.controller;

import com.oracle.hrb.bean.Notebook;
import com.oracle.hrb.bean.User;
import com.oracle.hrb.service.NoteBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notebook")
public class NotebookController {

    @Autowired
    private NoteBookService noteBookService;

    @GetMapping
    public Object notebookList(HttpSession session){
        User user = (User) session.getAttribute("user");
        List<Notebook> special = noteBookService.findSpecial(user.getId());
        List<Notebook> normal = noteBookService.findNormal(user.getId());
        Map<String,Object> result = new HashMap<>();
        result.put("special",special);
        result.put("normal",normal);
        return result;
    }

    @PostMapping
    public Object addnotebook(String name,HttpSession session){
        User user = (User) session.getAttribute("user");
        Map<String, Object> result = noteBookService.addNotebook(name, user.getId());
        return result;
    }
    @PutMapping
    public Object updatenotebook(){
        System.out.println("修改笔记本");
        return null;
    }
    @DeleteMapping
    public Object deletenotebook(){
        System.out.println("删除笔记本");
        return null;
    }

}
