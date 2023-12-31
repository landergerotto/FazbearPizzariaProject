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
import { Router } from '@angular/router';
import { BarChartComponent } from '../bar-chart/bar-chart.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,
    FormsModule, MatFormFieldModule, MatInputModule, BarChartComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  hide=true;

  goToProdutos() {
    this.router.navigate(["produtos"])
  }

  goToTotem() {
    this.router.navigate(["pretotem"])
  }

  goToCozinhaPedidos() {
    this.router.navigate(["pedidos"])
  }

  goToUsuarioaPedidos() {
    this.router.navigate(["upedidos"])
  }

  goToDashboard() {
    this.router.navigate(["dashboard"])
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
