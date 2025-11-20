package com.isetr.e_commerce.service;

import com.isetr.e_commerce.entity.Product;
import com.isetr.e_commerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

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
    public void delete(Long id) {
        Product existing = getOne(id);
        productRepository.delete(existing);
    }
}
