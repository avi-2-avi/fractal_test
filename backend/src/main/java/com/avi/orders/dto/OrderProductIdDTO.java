package com.avi.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderProductIdDTO {
    private Integer product_id;
    private String name;
    private Integer quantity;
    private Double unit_price;
    private Double total_price;
}
