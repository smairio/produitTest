package com.app.produit.Service;

import com.app.produit.Model.Produit;
import com.app.produit.Repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitService {
    @Autowired
    private ProduitRepository produitRepository;


    public Produit createProduit(Produit product){
        return produitRepository.save(product);
    }

    public Produit readProduit(Long id){
        return produitRepository.findById(id).get();
    }

    public List<Produit> readAllProducts(){
        return produitRepository.findAll();
    }

    public Produit updateById(Long id, Produit newProduct){
        Produit product = produitRepository.findById(id).get();
        if(!product.getNom().equals(newProduct.getNom())){
            product.setNom(newProduct.getNom());
        }
        if(product.getPrixUnitaire()!= newProduct.getPrixUnitaire()){
            product.setPrixUnitaire(newProduct.getPrixUnitaire());
        }
        if(product.getQuantite()!=newProduct.getQuantite()){
            product.setQuantite(newProduct.getQuantite());
        }
        return produitRepository.save(product);
    }

    public boolean deleteProduit(Long id) {
        try {
            produitRepository.deleteById(id);
            return true;
        } catch (EmptyResultDataAccessException e) {
            return false;
        }
    }
}
