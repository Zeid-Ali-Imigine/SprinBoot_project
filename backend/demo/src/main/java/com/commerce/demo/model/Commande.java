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
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;

    @NotBlank(message = "Le statut est obligatoire")
    @Size(max = 50)
    private String statut;

    @Column(nullable = false)
    private Double montantTotal;

    @NotBlank(message = "L'adresse de livraison est obligatoire")
    @Size(max = 255)
    private String adresseLivraison;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime dateCommande;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL)
    private List<ArticleCommande> articles;
}
