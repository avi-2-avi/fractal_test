package com.avi.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductDTO {
    private Integer id;
    private String name;
    private Double unit_price;
}
