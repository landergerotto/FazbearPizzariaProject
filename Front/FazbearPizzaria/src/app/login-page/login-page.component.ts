import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ClientServiceService } from '../services/client.service';
import { HttpClient } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatCardModule, MatButtonModule,
            FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(
    public dialog: MatDialog,
    private client: ClientServiceService,
    private http: HttpClient,
    private router: Router,
  ) { }

  username: string = ''
  password: string = ''

  hide = true;

  logar()
  {
    this.client.login({
      login: this.username,
      password: this.password,
      isAdm: false,
    }, (result: any) => {
      if (result == null)
      {
        alert('Senha ou usuário incorreto!')
      }
      else
      {
        if (result.adm == false)
        this.router.navigate(["user"])

        else {
          sessionStorage.setItem('jwt', JSON.stringify(result))
          this.router.navigate(["admin"])
        }
      }
    })
  }
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
  styleUrl: './login-page.component.css'
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
    if (this.password == this.repeatPassword) {
      this.client.register({
        login: this.username,
        password: this.password,
        isAdm: elp,
      })
      this.dialogRef.close()
    }

  }
}
