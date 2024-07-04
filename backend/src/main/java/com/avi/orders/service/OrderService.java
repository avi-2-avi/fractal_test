package com.avi.orders.service;

import com.avi.orders.dto.OrderCreateDTO;
import com.avi.orders.dto.OrderDTO;
import com.avi.orders.dto.OrderIdDTO;
import com.avi.orders.dto.OrderListDTO;
import com.avi.orders.model.Order;

import java.util.List;

public interface OrderService {
    List<OrderListDTO> getAllOrders();
    OrderIdDTO getOrderById(Integer id);
    void addOrder(OrderCreateDTO orderCreateDTO);
    void editOrder(OrderDTO orderDTO);
    void deleteOrder(Integer id);
    void changeOrderStatus(Integer id, String status);
}
