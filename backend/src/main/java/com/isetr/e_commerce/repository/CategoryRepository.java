package com.isetr.e_commerce.repository;

import com.isetr.e_commerce.entity.Category;
import com.isetr.e_commerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
}
