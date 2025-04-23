package com.commerce.demo.model;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 100)
    private String nom;

    @Email(message = "Email invalide")
    @NotBlank(message = "L'email est obligatoire")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 6)
    @Column(nullable = false)
    private String motDePasseHash;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime dateCreation;

    @OneToMany(mappedBy = "utilisateur")
    private List<Commande> commandes;
}





























// import jakarta.persistence.*;
// import jakarta.validation.constraints.*;
// import lombok.Data;
// import lombok.AllArgsConstructor;
// // import lombok.Builder;
// import lombok.NoArgsConstructor;
// // import lombok.EqualsAndHashCode;
// // import lombok.ToString;
// import org.hibernate.annotations.CreationTimestamp;
// import org.hibernate.annotations.UpdateTimestamp;

// import java.time.LocalDateTime;
// // import java.util.HashSet;
// // import java.util.Set;

// @Entity
// @Table(name = "utilisateurs", uniqueConstraints = {
//     @UniqueConstraint(columnNames = "email")
// })
// @Data // Génère getters, setters, toString, equals, hashCode
// @NoArgsConstructor
// @AllArgsConstructor
// // @Builder
// public class User {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @NotBlank(message = "Le nom est obligatoire")
//     @Size(min = 2, max = 100)
//     private String name;

//     @Email(message = "Email invalide")
//     @NotBlank(message = "L'email est obligatoire")
//     @Column(nullable = false, unique = true)
//     private String email;

//     @NotBlank(message = "Le mot de passe est obligatoire")
//     @Size(min = 6)
//     @Column(nullable = false)
//     private String password;

//     @Enumerated(EnumType.STRING)
//     @Column(length = 20)
//     private String role;

//     @CreationTimestamp
//     @Column(updatable = false)
//     private LocalDateTime createdAt;

//     @UpdateTimestamp
//     private LocalDateTime updatedAt;

//     @Column
//     private boolean active = true;

    
    
// }




