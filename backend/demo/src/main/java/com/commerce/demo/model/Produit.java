package com.commerce.demo.model;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String nom;

    @NotBlank
    @Size(max = 500)
    private String description;

    @Column(nullable = false)
    private Double prix;

    @Min(0)
    @Column(nullable = false)
    private Integer quantiteStock;

    @ManyToOne(optional = false)
    @JoinColumn(name = "categorie_id")
    @JsonIgnoreProperties("produits")
    private Categorie categorie;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime dateAjout;

    @OneToMany(mappedBy = "produit", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("produit")
    private List<ArticleCommande> articlesCommande;
}
