package com.isetr.e_commerce.service;

import com.isetr.e_commerce.entity.Category;
import com.isetr.e_commerce.entity.UnderCategory;
import com.isetr.e_commerce.repository.CategoryRepository;
import com.isetr.e_commerce.repository.UnderCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnderCategoryServiceImpl implements UnderCategoryService {

    private final UnderCategoryRepository underCategoryRepository;
    private final CategoryRepository categoryRepository;

    public UnderCategoryServiceImpl(UnderCategoryRepository underCategoryRepository,
                                    CategoryRepository categoryRepository) {
        this.underCategoryRepository = underCategoryRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public UnderCategory findById(Long id) {
        return underCategoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("UnderCategory not found"));
    }

    @Override
    public List<UnderCategory> findAll() {
        return underCategoryRepository.findAll();
    }

    @Override
    public UnderCategory create(UnderCategory underCategory) {
        // If a category id was provided, ensure it's attached
        if (underCategory.getCategory() != null && underCategory.getCategory().getId() != null) {
            Category category = categoryRepository.findById(underCategory.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            underCategory.setCategory(category);
        }
        return underCategoryRepository.save(underCategory);
    }

    @Override
    public UnderCategory update(UnderCategory underCategory, Long id) {
        UnderCategory existing = findById(id);
        existing.setName(underCategory.getName());
        if (underCategory.getCategory() != null && underCategory.getCategory().getId() != null) {
            Category category = categoryRepository.findById(underCategory.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            existing.setCategory(category);
        }
        return underCategoryRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        underCategoryRepository.deleteById(id);
    }
}
