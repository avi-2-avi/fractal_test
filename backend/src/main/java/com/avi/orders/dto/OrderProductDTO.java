package com.avi.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class OrderProductDTO {
    private Integer product_id;
    private Integer quantity;
}
