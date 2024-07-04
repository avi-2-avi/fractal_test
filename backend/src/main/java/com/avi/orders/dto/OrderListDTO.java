package com.avi.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderListDTO {
    private Integer id;
    private String order_number;
    private Integer product_quantity;
    private Double final_price;
    private String status;
    private String created_at;
}
