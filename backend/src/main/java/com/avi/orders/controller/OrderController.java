package com.avi.orders.controller;

import com.avi.orders.dto.OrderCreateDTO;
import com.avi.orders.dto.OrderDTO;
import com.avi.orders.dto.OrderIdDTO;
import com.avi.orders.dto.OrderListDTO;
import com.avi.orders.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/")
    public List<OrderListDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public OrderIdDTO getOrderById(@PathVariable Integer id) {
        return orderService.getOrderById(id);
    }

    @PostMapping("/add")
    public void addOrder(@RequestBody OrderCreateDTO orderCreateDTO) {
        orderService.addOrder(orderCreateDTO);
    }

    @PutMapping("/update")
    public void updateOrder(@RequestBody OrderDTO orderDTO) {
        orderService.editOrder(orderDTO);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteOrder(@PathVariable Integer id) {
        orderService.deleteOrder(id);
    }

    @PutMapping("/update-status/{id}")
    public void updateOrderStatus(@PathVariable Integer id, @RequestParam String status) {
        orderService.changeOrderStatus(id, status);
    }
}
