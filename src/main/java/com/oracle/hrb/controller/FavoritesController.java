package com.oracle.hrb.controller;

import com.oracle.hrb.bean.Favorites;
import com.oracle.hrb.service.FavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
