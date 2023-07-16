package com.app.produit.Controller;

import com.app.produit.Model.Produit;
import com.app.produit.Service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("api/produit")
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @PostMapping
    public ResponseEntity<Produit> createProduit(@RequestBody Produit produit){
        Produit savedProduit = produitService.createProduit(produit);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduit);
    }
    @GetMapping
    public ResponseEntity<List<Produit>> readProduits(){
        List<Produit> produits = produitService.readAllProducts();
        return ResponseEntity.status(HttpStatus.OK).body(produits);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produit> readProduit(@PathVariable(value = "id") Long id){
        Produit produit = produitService.readProduit(id);
        return ResponseEntity.status(HttpStatus.OK).body(produit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produit> updateProduit(@PathVariable(value = "id") Long id,@RequestBody Produit produitBody){
        Produit produit = produitService.updateById(id,produitBody);
        return ResponseEntity.status(HttpStatus.OK).body(produit);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduit(@PathVariable(value = "id") Long id){
        boolean deleted = produitService.deleteProduit(id);
        if (deleted) {
            return ResponseEntity.accepted().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    }

