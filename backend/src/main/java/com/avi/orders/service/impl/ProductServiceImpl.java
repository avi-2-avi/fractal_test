package com.avi.orders.service.impl;

import com.avi.orders.dto.ProductDTO;
import com.avi.orders.model.OrderProduct;
import com.avi.orders.model.Product;
import com.avi.orders.repository.OrderProductRepository;
import com.avi.orders.repository.ProductRepository;
import com.avi.orders.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final OrderProductRepository orderProductRepository;

    public ProductServiceImpl(ProductRepository productRepository, OrderProductRepository orderProductRepository) {
        this.productRepository = productRepository;
        this.orderProductRepository = orderProductRepository;
    }
    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public ProductDTO getProductById(Integer id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return null;
        }
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getUnit_price()
        );
    }

    @Override
    public void addProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public void editProduct(Product product) {
        Product existingProduct = productRepository.findById(product.getId()).orElse(null);
        if (existingProduct == null) {
            return;
        }
        existingProduct.setName(product.getName());
        existingProduct.setUnit_price(product.getUnit_price());
        productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(Integer id) {
        // Delete order_product with id of product
        List<OrderProduct> orderProducts = orderProductRepository.findAllByProductId(id);
        orderProductRepository.deleteAll(orderProducts);
        // Delete product
        productRepository.deleteById(id);
    }
}
