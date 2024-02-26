package com.example.demo.controller;


import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/posts/*")
public class PostUIController {

    private PostService postService;

    @Autowired
    public PostUIController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping(value = {"/"})
    public String hello() {

        return "index.html";
    }




}
