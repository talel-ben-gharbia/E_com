package com.isetr.e_commerce.controller;

import com.isetr.e_commerce.entity.UnderCategory;
import com.isetr.e_commerce.service.UnderCategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/under-category")
public class UnderCategoryController {

    private final UnderCategoryService underCategoryService;

    public UnderCategoryController(UnderCategoryService underCategoryService) {
        this.underCategoryService = underCategoryService;
    }

    @PostMapping
    public UnderCategory create(@RequestBody UnderCategory underCategory) {
        return underCategoryService.create(underCategory);
    }

    @GetMapping
    public List<UnderCategory> getAll() {
        return underCategoryService.findAll();
    }

    @GetMapping("/{id}")
    public UnderCategory get(@PathVariable Long id) {
        return underCategoryService.findById(id);
    }

    @PutMapping("/{id}")
    public UnderCategory update(@PathVariable Long id, @RequestBody UnderCategory underCategory) {
        return underCategoryService.update(underCategory, id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        underCategoryService.delete(id);
    }
}
