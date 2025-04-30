package com.commerce.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ArticleCommande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "commande_id")
    @JsonIgnoreProperties("articlesCommande")
    private Commande commande;

    @ManyToOne(optional = false)
    @JoinColumn(name = "produit_id")
    @JsonIgnoreProperties("articlesCommande")
    private Produit produit;

    @Min(1)
    @Column(nullable = false)
    private Integer quantite;

    @Column(nullable = false)
    private Double prixUnitaire;

    @Column(nullable = false)
    private Double sousTotal;
}
