package com.isetr.e_commerce.service;

import com.isetr.e_commerce.entity.UnderCategory;

import java.util.List;

public interface UnderCategoryService {
    UnderCategory findById(Long id);
    List<UnderCategory> findAll();
    UnderCategory create(UnderCategory underCategory);
    UnderCategory update(UnderCategory underCategory, Long id);
    void delete(Long id);
}
