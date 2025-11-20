package com.isetr.e_commerce.controller;

import com.isetr.e_commerce.entity.Category;
import com.isetr.e_commerce.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    // Create a new category
    @PostMapping
    public Category create(@RequestBody Category category) {
        return categoryService.create(category);
    }

    // Get all categories
    @GetMapping
    public List<Category> getAll() {
        return categoryService.findAll();
    }

    // Get a category by ID
    @GetMapping("/{id}")
    public Category get(@PathVariable Long id) {
        return categoryService.findById(id);
    }

    // Update a category by ID
    @PutMapping("/{id}")
    public Category update(@PathVariable Long id, @RequestBody Category category) {
        return categoryService.update(category,id);
    }

    // Delete a category by ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categoryService.delete(id);
    }
}
