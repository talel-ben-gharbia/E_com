package com.isetr.e_commerce.service;

import com.isetr.e_commerce.entity.Category;

import java.util.List;

public interface CategoryService {

    Category findById(Long id);
    List<Category> findAll();
    Category create(Category category);
    Category update(Category category,Long id);
    void delete(Long id);
}
