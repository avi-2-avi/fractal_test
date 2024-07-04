package com.avi.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderProductCreateDTO {
    private Integer quantity;
    private Integer product_id;
}
