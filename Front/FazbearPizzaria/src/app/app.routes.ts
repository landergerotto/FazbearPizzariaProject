import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { PedidosPageComponent } from './pedidos-page/pedidos-page.component';
import { TotemPageComponent } from './totem-page/totem-page.component';
import { ProdutosPageComponent } from './produtos-page/produtos-page.component';

export const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'admin', component: AdminPageComponent},
  {path:'pedidos', component: PedidosPageComponent},
  {path:'totem', component: TotemPageComponent},
  {path:'produtos', component: ProdutosPageComponent},


];
