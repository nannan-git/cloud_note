package com.oracle.hrb.controller;

import com.oracle.hrb.bean.Note;

import com.oracle.hrb.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/note")
public class NoteController {

    @Autowired
    private NoteService noteService;


    @GetMapping
    public Object noteList(String notebookId){
        return noteService.findList(notebookId);
}
    @PostMapping
    public Object addNote(Note note){
       noteService.addNote(note);
       return note;
    }
    @PutMapping
    public Object updateNote(Note note){
        noteService.updateNote(note);
        return note;
    }
    @PutMapping("/move")
    public void moveNote(Note note){
        noteService.moveNote(note);
    }

    @DeleteMapping
    public void deleteNote(String id){
        noteService.deleteNote(id);
    }
}
