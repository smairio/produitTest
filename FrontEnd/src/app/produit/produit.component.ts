import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { ProduitService } from '../service/produit.service';
import { SuccessMessageService } from '../service/success-message.service';
import { AddProduitComponent } from './add-produit/add-produit.component';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom', 'prixUnitaire', 'quantite','action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private produitService: ProduitService,
              private _dialog :MatDialog,
              private _successMessage:SuccessMessageService ) {
                
             }

  ngOnInit() {
    this.getProduits();
  }


  getProduits(): any {
    return this.produitService.getAllproduit().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openAddProduit(){
    const dialogRef = this._dialog.open(AddProduitComponent);
    dialogRef.afterClosed().subscribe({
      next :(res) =>{
        if(res){
          this.getProduits()
        }
      }
    })
  }

  openEditProduit(data : any){
    const dialogRef = this._dialog.open(AddProduitComponent,{
    data :data
   });
   dialogRef.afterClosed().subscribe({
    next : (res) =>{
      if(res){
        this.getProduits();
      }
    }
   })
  }

  deleteProject(id : number) : any {
    this.produitService.deleteProduit(id).subscribe({
      next : (res) => {
        this._successMessage.openSnackBar("Le produit a été supprimé avec succès.", "done");
        this.getProduits();
      },
      error : (err) => {
        console.log(err)
      }
    })
  }


  openDeleteConfirmationDialog(data: any,name:string) {
    const dialogRef = this._dialog.open(DeleteConfirmationComponent,{
      data : name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed deletion, perform the deletion action
        this.deleteProject(data.id);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}