package com.isetr.e_commerce.service;

import com.isetr.e_commerce.entity.Product;
import com.isetr.e_commerce.repository.ProductRepository;
import com.isetr.e_commerce.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import com.isetr.e_commerce.entity.Category;


import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Product create(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product getOne(Long id) {
        return productRepository.findById(id.longValue())
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public Product update(Product product, Long id) {
        Product existing = getOne(id);
        existing.setName(product.getName());
        existing.setDescription(product.getDescription());
        existing.setPrice(product.getPrice());
        existing.setQuantity(product.getQuantity());
        existing.setCategory(product.getCategory());
        return productRepository.save(existing);
    }

    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @Override
    public Product createWithImage(Product product, MultipartFile image) {

    try {
        // 1. Save file
        String uploadDir = "uploads/";
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);

        Files.createDirectories(filePath.getParent());
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // 2. Generate image URL
        String imgUrl = "http://localhost:8080/uploads/" + fileName;
        product.setImgUrl(imgUrl);

        // If product has a category object with only id → load full category
        if (product.getCategory() != null && product.getCategory().getId() != null) {
            Category category = categoryRepository.findById(product.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }

        // 3. Save product
        return productRepository.save(product);

    } catch (Exception e) {
        throw new RuntimeException("Error uploading image: " + e.getMessage());
    }
}



    @Override
    public void delete(Long id) {
        Product existing = getOne(id);
        productRepository.delete(existing);
    }
}
