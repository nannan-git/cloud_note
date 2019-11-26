package com.oracle.hrb.dao;

import com.oracle.hrb.bean.Favorites;

import java.util.List;

public interface FavoritesDao {
    void add(Favorites favorites);
    List<Favorites> findByNoteBookId(String id);
    void delete(String id);
    Favorites findOne(Favorites favorites);
}
