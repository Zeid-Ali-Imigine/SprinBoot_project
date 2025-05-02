package com.commerce.demo.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CategorieDTO {
    private Long id;
    
    @NotBlank
    @Size(max = 100)
    private String nom;
    
    @NotBlank
    @Size(max = 255)
    private String description;
    
    private LocalDateTime dateCreation;
}