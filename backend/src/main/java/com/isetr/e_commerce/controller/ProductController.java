package com.isetr.e_commerce.controller;

import com.isetr.e_commerce.entity.Category;
import com.isetr.e_commerce.entity.Product;
import com.isetr.e_commerce.repository.CategoryRepository;
import com.isetr.e_commerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService; // make final for Lombok injection

    @PostMapping
    public Product create(@RequestBody Product product) {
        return productService.create(product);
    }

    @GetMapping
    public List<Product> getAll() {
        return productService.getAll();
    }
}
