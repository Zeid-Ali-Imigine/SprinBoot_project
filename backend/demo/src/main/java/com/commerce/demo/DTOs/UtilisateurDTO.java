package com.commerce.demo.DTOs;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UtilisateurDTO {
    private Long id;
    
    @NotBlank @Size(min = 2, max = 100)
    private String nom;
    
    @Email @NotBlank
    private String email;
    
    @NotBlank @Size(min = 6)
    private String motDePasseHash;
    
    private LocalDateTime dateCreation;
}