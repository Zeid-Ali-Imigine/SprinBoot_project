package com.commerce.demo.DTOs;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ArticleCommandeDTO {
    private Long id;
    
    @NotNull
    private Long commandeId;
    
    @NotNull
    private Long produitId;
    private String produitNom;
    
    @Min(1)
    private Integer quantite;
    
    @NotNull @Positive
    private Double prixUnitaire;
    
    @NotNull @Positive
    private Double sousTotal;
}