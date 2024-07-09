package com.avi.orders.repository;

import com.avi.orders.model.OrderProduct;
import com.avi.orders.model.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Integer> {
    List<OrderProduct> findAllByProductId(Integer id);

    List<OrderProduct> findAllByOrderId(Integer id);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM order_products WHERE order_id = ?1 AND product_id = ?2", nativeQuery = true)
    void deleteAllByOrderIdAndProductId(Integer orderId, Integer productId);

    @Query(value = "SELECT * FROM order_products WHERE order_id = ?1 AND product_id = ?2", nativeQuery = true)
    OrderProduct findAllByOrderIdAndProductId(Integer orderId, Integer productId);
}
