import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { PedidosPageComponent } from './pedidos-page/pedidos-page.component';
import { PedidoPageUserComponent } from './pedido-page-user/pedido-page-user.component';
import { TotemPageComponent } from './totem-page/totem-page.component';
import { ProdutosPageComponent } from './produtos-page/produtos-page.component';
import { CarrinhoPageComponent } from './carrinho-page/carrinho-page.component';
import { PreTotemPageComponent } from './pre-totem-page/pre-totem-page.component';

export const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'user', component: UserPageComponent},
  {path:'pedidos', component: PedidosPageComponent},
  {path:'upedidos', component: PedidoPageUserComponent},
  {path:'totem', component: TotemPageComponent},
  {path:'pretotem', component: PreTotemPageComponent},
  {path:'produtos', component: ProdutosPageComponent},
  {path:'cart', component: CarrinhoPageComponent},



];
