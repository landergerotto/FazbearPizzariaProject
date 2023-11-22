import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { PedidosPageComponent } from './pedidos-page/pedidos-page.component';

export const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'admin', component: AdminPageComponent},
  {path:'pedidos', component: PedidosPageComponent},

];
