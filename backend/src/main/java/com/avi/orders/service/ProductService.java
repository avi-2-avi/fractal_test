package com.avi.orders.service;

import com.avi.orders.dto.ProductDTO;
import com.avi.orders.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    ProductDTO getProductById(Integer id);
    void addProduct(Product product);
    void editProduct(Product product);
    void deleteProduct(Integer id);
}
