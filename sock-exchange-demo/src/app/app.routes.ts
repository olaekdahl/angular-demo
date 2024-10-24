import { Routes, provideRouter } from '@angular/router';
import { SockListComponent } from './sock-list/sock-list.component';
import { SockDetailsComponent } from './sock-details/sock-details.component';
import { SockCartComponent } from './sock-cart/sock-cart.component';
import { SockCheckoutComponent } from './sock-checkout/sock-checkout.component';
import { ChatComponent } from './chat/chat.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: SockListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'details', component: SockDetailsComponent },
  { path: 'cart', component: SockCartComponent },
  { path: 'checkout', component: SockCheckoutComponent },
  { path: 'ws', component: ChatComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },

];

export const appRouting = provideRouter(routes);
