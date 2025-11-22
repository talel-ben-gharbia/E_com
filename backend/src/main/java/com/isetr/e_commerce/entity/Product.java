package com.isetr.e_commerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private int quantity;


    public float getSold() {
        return sold;
    }

    public void setSold(float sold) {
        this.sold = sold;
    }

    public Product(Long id) {
        this.id = id;
    }

    private float sold;



    private String imgUrl;

    @ManyToOne
    @JoinColumn(name = "category_id") // foreign key in products table
    private Category category;

    @ManyToOne
    @JoinColumn(name = "under_category_id")
    private UnderCategory underCategory;

    // Constructors
    public Product() {
    }

    public Product(String name, String description, double price, int quantity,float sold,String imgUrl, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.sold = sold;
        this.imgUrl = imgUrl;
        this.category = category;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
    public UnderCategory getUnderCategory() {
        return underCategory;
    }

    public void setUnderCategory(UnderCategory underCategory) {
        this.underCategory = underCategory;
    }
    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }
}
