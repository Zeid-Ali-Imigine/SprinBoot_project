package com.commerce.demo.model;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

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
    private Categorie categorie;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime dateAjout;

    @OneToMany(mappedBy = "produit", cascade = CascadeType.ALL)
    private List<ArticleCommande> articlesCommande;
}

