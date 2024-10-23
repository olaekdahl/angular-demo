import { Routes, provideRouter } from '@angular/router';
import { SockListComponent } from './sock-list/sock-list.component';
import { SockDetailsComponent } from './sock-details/sock-details.component';
import { SockCartComponent } from './sock-cart/sock-cart.component';
import { SockCheckoutComponent } from './sock-checkout/sock-checkout.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  { path: '', component: SockListComponent },
  { path: 'details', component: SockDetailsComponent },
  { path: 'cart', component: SockCartComponent },
  { path: 'checkout', component: SockCheckoutComponent },
  { path: 'ws', component: ChatComponent },
];

export const appRouting = provideRouter(routes);
