import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


import { AppRoutingModule } from './app-routing.module';

import { DataService } from './shared/data.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component'

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ProductComponent,
        CheckoutComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        InfiniteScrollModule
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {}