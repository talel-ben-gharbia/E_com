package com.isetr.e_commerce.service;

import com.isetr.e_commerce.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    Product create(Product product);
    Product createWithImage(Product product, MultipartFile image);
    Product getOne(Long id);
    Product update(Product product ,Long id);
    List<Product> getAll();
    void delete(Long id);
}
