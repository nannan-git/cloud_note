package com.oracle.hrb.dao;

import com.oracle.hrb.bean.Note;

import java.util.List;

public interface NoteDao {
    void add(Note note);
    void delete(String id);
    void deleteByNotebookId(String notebookId);
    void update(Note note);
    void move(Note note);
    List<Note> findByNotebookId(String notebookId);
    Note findById(String id);
}
