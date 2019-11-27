package com.oracle.hrb.controller;

import com.oracle.hrb.bean.Favorites;
import com.oracle.hrb.service.FavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
public class FavoritesController {
    @Autowired
    private FavoritesService favoritesService;

    @PostMapping
    public boolean favorites(String notebookId,String shareId){
        return favoritesService.favorties(notebookId,shareId);
    }

    @GetMapping
    public List<Favorites> favoritesList(String notebookId){
        return  favoritesService.favoritesList(notebookId);
    }

    @DeleteMapping
    public void deleteFavorites(String id){
        favoritesService.deleteFavorites(id);
    }
}
