package com.commerce.demo.model;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "utilisateur_id")
    @JsonBackReference
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
    @JsonManagedReference
    private List<ArticleCommande> articles;
}
