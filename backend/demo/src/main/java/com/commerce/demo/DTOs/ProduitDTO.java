package com.commerce.demo.DTOs;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ProduitDTO {
    private Long id;
    
    @NotBlank @Size(max = 100)
    private String nom;
    
    @NotBlank @Size(max = 500)
    private String description;
    
    @NotNull @Positive
    private Double prix;
    
    @Min(0)
    private Integer quantiteStock;
    
    @NotNull
    private Long categorieId;
    private String categorieNom;
    
    private LocalDateTime dateAjout;
}