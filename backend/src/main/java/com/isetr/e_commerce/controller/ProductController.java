package com.isetr.e_commerce.controller;

import com.isetr.e_commerce.entity.Product;
import com.isetr.e_commerce.service.ProductService;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Product create(@RequestBody Product product) {
        return productService.create(product);
    }

    @PostMapping(path = "/with-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> createProductWithImage(
            @RequestPart("product") Product product,
            @RequestPart("image") MultipartFile image
    ) {
        Product created = productService.createWithImage(product, image);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public List<Product> getAll() {
        return productService.getAll();
    }
}
