package com.oracle.hrb.service;

import com.oracle.hrb.bean.Note;
import com.oracle.hrb.dao.NoteDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class NoteService {

    @Autowired
    private NoteDao noteDao;



    @Transactional
    public List<Note> findList(String notebookId){
        return noteDao.findByNotebookId(notebookId);
    }

    @Transactional
    public void addNote(Note note){
       if(note.getTitle()==null||note.getTitle().trim().length()==0){
            note.setTitle("新建笔记");
       }
        note.setId(UUID.randomUUID().toString());
        note.setModifyTime(new Date());
        noteDao.add(note);
    }
    @Transactional
    public void updateNote(Note note){
        note.setModifyTime(new Date());
        noteDao.update(note);
    }
    @Transactional
    public void moveNote(Note note){
        noteDao.move(note);
    }
    @Transactional
    public void deleteNote(String id){
        noteDao.delete(id);
    }
    @Transactional
    public void deleteNotebookId(String id){
        noteDao.deleteByNotebookId(id);
    }
}
