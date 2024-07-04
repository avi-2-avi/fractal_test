package com.avi.orders.service.impl;

import com.avi.orders.dto.*;
import com.avi.orders.model.Order;
import com.avi.orders.model.OrderProduct;
import com.avi.orders.model.Product;
import com.avi.orders.repository.OrderProductRepository;
import com.avi.orders.repository.OrderRepository;
import com.avi.orders.repository.ProductRepository;
import com.avi.orders.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderProductRepository orderProductRepository;
    private final ProductRepository productRepository;
    public OrderServiceImpl(OrderRepository orderRepository, OrderProductRepository orderProductRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.orderProductRepository = orderProductRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<OrderListDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        List<OrderListDTO> orderListDTOS = new ArrayList<>();
        for (Order order : orders) {
            double finalPrice = 0.0;
            Integer totalQuantity = 0;

            List<OrderProduct> orderProducts = orderProductRepository.findAllByOrderId(order.getId());
            for (OrderProduct orderProduct : orderProducts) {
                totalQuantity += orderProduct.getQuantity();
                Product product = orderProduct.getProduct();
                finalPrice += orderProduct.getQuantity() * product.getUnit_price();
            }

            OrderListDTO orderListDTO = new OrderListDTO(
                    order.getId(),
                    order.getOrder_number(),
                    totalQuantity,
                    finalPrice,
                    order.getStatus(),
                    order.getCreated_at().toString()
            );
            orderListDTOS.add(orderListDTO);
        }
        return orderListDTOS;
    }

    @Override
    public OrderIdDTO getOrderById(Integer id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) {
            throw new RuntimeException("Order not found");
        }
        double finalPrice = 0.0;
        Integer totalQuantity = 0;

        List<OrderProduct> orderProducts = orderProductRepository.findAllByOrderId(order.getId());

        List<OrderProductIdDTO> orderProductIdDTOs = new ArrayList<>();
        for (OrderProduct orderProduct : orderProducts) {

            Product product = orderProduct.getProduct();
            totalQuantity += orderProduct.getQuantity();
            finalPrice += orderProduct.getQuantity() * product.getUnit_price();

            OrderProductIdDTO orderProductIdDTO = new OrderProductIdDTO(
                product.getId(),
                product.getName(),
                orderProduct.getQuantity(),
                product.getUnit_price(),
                orderProduct.getQuantity() * product.getUnit_price()
            );
            orderProductIdDTOs.add(orderProductIdDTO);
        }

         return new OrderIdDTO(
            order.getId(),
            order.getOrder_number(),
            order.getStatus(),
            order.getCreated_at().toString(),
            totalQuantity,
            finalPrice,
            orderProductIdDTOs
         );
    }

    @Override
    public void addOrder(OrderCreateDTO orderCreateDTO) {
        // Create the order
        Order order = new Order(
            orderCreateDTO.getOrder_number(),
            orderCreateDTO.getStatus()
        );
        orderRepository.save(order);

        if (orderCreateDTO.getOrderProducts() != null) {
            for (OrderProductCreateDTO orderProductCreateDTO : orderCreateDTO.getOrderProducts()) {
                OrderProduct orderProduct = new OrderProduct();
                Product product = productRepository.findById(orderProductCreateDTO.getProduct_id()).orElse(null);

                orderProduct.setOrder(order);
                orderProduct.setProduct(product);
                orderProduct.setQuantity(orderProductCreateDTO.getQuantity());
                orderProductRepository.save(orderProduct);
            }
        }
    }

    @Override
    public void editOrder(OrderDTO orderDTO) {
    }

    @Override
    public void deleteOrder(Integer id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) {
            throw new RuntimeException("Order not found");
        }
        orderRepository.delete(order);
    }

    @Override
    public void changeOrderStatus(Integer id, String status) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) {
            throw new RuntimeException("Order not found");
        }
        order.setStatus(status);
        orderRepository.save(order);
    }
}
