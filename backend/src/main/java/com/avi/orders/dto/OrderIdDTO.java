package com.avi.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class OrderIdDTO {
    private Integer id;
    private String order_number;
    private String status;
    private String created_at;
    private Integer product_quantity;
    private Double final_price;
    private List<OrderProductIdDTO> orderProductList;
}
