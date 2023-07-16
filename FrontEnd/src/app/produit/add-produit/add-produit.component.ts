import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ErrorComponentComponent } from 'src/app/error-component/error-component.component';
import { ProduitService } from 'src/app/service/produit.service';
import { SuccessMessageService } from 'src/app/service/success-message.service';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent implements OnInit {
  produit: any[] = [];
  ProduitForm : FormGroup;


  constructor(
    private _dialog:MatDialog,
    private produitService : ProduitService,
    private _formBuilder : FormBuilder,
    private _dialogRef : MatDialogRef<AddProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _successMessage : SuccessMessageService,
  ) {
    this.ProduitForm = this._formBuilder.group({
    nom : ['',[Validators.required]],
      prixUnitaire: [null, [Validators.required,Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      quantite : ['',[Validators.required,Validators.pattern(/^-?\d+$/)]],
    })
  }
  ngOnInit(){
    this.ProduitForm.patchValue(this.data);
  }
  get nom() {
    return this.ProduitForm.get('nom')
  }
  get prixUnitaire(){
    return this.ProduitForm.get('prixUnitaire')
  }
  get quantite(){
    return this.ProduitForm.get('quantite')
  }


  onFormSubmit() {
    if (this.ProduitForm.valid) {
      if(this.data){
        console.log(this.ProduitForm)
        this.produitService.updateProduit(this.data.id,this.ProduitForm.value).subscribe({
          next : (res) => {
            this._successMessage.openSnackBar("Produit Updated!", "done");
            console.log(res);
            this._dialogRef.close(true);
          },
          error : (err) => {
            console.log(err);
            this.openErrorDisplayDialogue(err);
          }
        });
      }
      else {
        console.log(this.ProduitForm)
      this.produitService.addProduit(this.ProduitForm.value).subscribe({
        next:(val : any)=>{
          this._successMessage.openSnackBar("Project added!", "done");
          this._dialogRef.close(true);
        },
        error:(err :any)=>{
          console.log(err);
          this.openErrorDisplayDialogue(err);
        }
      })

    }
  }
  }

  openErrorDisplayDialogue(data: any) {
    const dialogRef = this._dialog.open(ErrorComponentComponent,{
      data : data
    });
}
}
