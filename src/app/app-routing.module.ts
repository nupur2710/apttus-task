import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';


const appRoutes: Routes = [{
        path: '',
        component: HomeComponent
    },

    {
        path: 'home',
        component: HomeComponent
    },

    {
        path: 'product',
        component: ProductComponent
    },

    {
        path: 'cart',
        component: CheckoutComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}