package com.isetr.e_commerce.service;

import com.isetr.e_commerce.entity.Category;
import com.isetr.e_commerce.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service  // <- This makes it a Spring bean
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public Category findById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category create(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category update(Category category, Long id) {
        Category existing = findById(id);
        existing.setName(category.getName());
        return categoryRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }
}
