import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http : HttpClient) { }

  getAllproduit() : Observable<any>{
    return this.http.get("/api/produit")
  }

  
  getproduitByid(id : number) : Observable<any> {
    return this.http.get("/api/produit/"+id);
  }

  addProduit( data : any) : Observable<any> {
    return this.http.post("api/produit",data);
  }

  updateProduit( id : number, data :any) : Observable<any> {
    return this.http.put("/api/produit/"+id, data);
  }

  deleteProduit(id : number) : Observable<any> {
    return this.http.delete("/api/produit/"+id);
  }
}
