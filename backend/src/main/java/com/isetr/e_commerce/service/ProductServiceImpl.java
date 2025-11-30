package com.isetr.e_commerce.service;

import com.isetr.e_commerce.entity.Product;
import com.isetr.e_commerce.repository.ProductRepository;
import com.isetr.e_commerce.repository.CategoryRepository;
import com.isetr.e_commerce.repository.UnderCategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import com.isetr.e_commerce.entity.Category;
import com.isetr.e_commerce.entity.UnderCategory;


import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final UnderCategoryRepository underCategoryRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository,
                              UnderCategoryRepository underCategoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.underCategoryRepository = underCategoryRepository;
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
        existing.setUnderCategory(product.getUnderCategory());
        return productRepository.save(existing);
    }

    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> search(String q) {
        if (q == null || q.trim().isEmpty()) return getAll();
        String term = q.trim();
        return productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(term, term);
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

        // Resolve under-category first (if provided) and keep category in sync
        if (product.getUnderCategory() != null && product.getUnderCategory().getId() != null) {
            UnderCategory underCategory = underCategoryRepository.findById(product.getUnderCategory().getId())
                .orElseThrow(() -> new RuntimeException("UnderCategory not found"));
            product.setUnderCategory(underCategory);
            // ensure product.category points to the parent category
            product.setCategory(underCategory.getCategory());
        } else if (product.getCategory() != null && product.getCategory().getId() != null) {
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
