package com.avi.orders.repository;

import com.avi.orders.model.OrderProduct;
import com.avi.orders.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Integer> {
    List<OrderProduct> findAllByProductId(Integer id);

    List<OrderProduct> findAllByOrderId(Integer id);

    void deleteAllByOrderId(Integer id);

    OrderProduct findAllByOrderIdAndProductId(Integer orderId, Integer productId);
}
