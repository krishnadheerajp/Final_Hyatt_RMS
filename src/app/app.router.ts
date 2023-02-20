import {Routes,RouterModule} from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { SelItemComponent } from './sel-item/sel-item.component';

export const router: Routes=[
    {path : '',redirectTo:'',pathMatch:'full'},
    {path : 'login' ,component : LoginComponent},
    {path: 'cart',component:CartComponent},
    {path: 'item/:id',component:SelItemComponent},
    {path: 'order', component:OrderComponent},
    {path: 'admin', component:AdminComponent}
];

export const routes = RouterModule.forRoot(router);