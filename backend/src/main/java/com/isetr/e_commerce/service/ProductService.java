package com.isetr.e_commerce.service;

import com.isetr.e_commerce.entity.Product;

import java.util.List;

public interface ProductService {
    Product create(Product product);

    Product getOne(Long id);
    Product update(Product product ,Long id);
    List<Product> getAll();
    void delete(Long id);
}
