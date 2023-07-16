package com.app.produit.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "exception_seq_generator")
    @Column(name="id" , columnDefinition = "BIGINT")
    private Long id;

    @Column(name="nom", columnDefinition = "VARCHAR(100)", nullable = false , unique = true)
    private String nom;

    @Column(name="prix_unitaire", nullable = false)
    private float prixUnitaire;

    @Column(name="quantite", nullable = false)
    private int quantite;
}
