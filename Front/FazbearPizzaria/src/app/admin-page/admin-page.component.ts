import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientServiceService } from '../services/client.service';
import { HttpClient } from '@angular/common/http';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,
    FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

  constructor(
    public dialog: MatDialog,
    private client: ClientServiceService,
    private http: HttpClient
  ) { }

  hide=true;

  registrar()
  {
    this.dialog.open(NewUserDialog);
  }

}

@Component({
  selector: 'app-new-user-dialog',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule,
    MatButtonModule, MatFormFieldModule, FormsModule, MatSlideToggleModule ],
  templateUrl: './new-user-dialog.component.html',
  styleUrl: './admin-page.component.css'
})

export class NewUserDialog
{
  username: string = ""
  password: string = ""
  repeatPassword: string = ""
  isAdm : boolean = false;

  constructor(public dialogRef: MatDialogRef<NewUserDialog>,
    private client: ClientServiceService
    ) {}

  create()
  {
    const elp = this.isAdm;
    console.log(elp == true ? 1 : 0)
    if (this.password == this.repeatPassword) {
      this.client.register({
        login: this.username,
        password: this.password,
        isAdm: elp,
      })
      console.log(this.isAdm)
      this.dialogRef.close()
    }

  }
}
