import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataService {
    cartCount = 0;
    cartItemAdded = new Subject < number > ();

    cartProducts: any[] = [];
    cartProductAdded = new Subject < {} > ();

    products: any[] = [];

    constructor() {

    }
    ngOnInit() {
        this.cartCount = this.getCartCount();
    }

    setProducts(products) {
        this.products = products;
    }

    getProducts() {
        return this.products;

    }

    setCartCount() {
        this.cartCount = this.cartProducts.length;
        this.cartItemAdded.next(this.cartCount);
    }

    getCartCount() {
        return this.cartCount;
    }


    setCartProducts(cartProducts) {
        this.cartProducts = cartProducts;
        this.cartProductAdded.next(this.cartProducts);
    }

    getcartProducts() {
        return this.cartProducts;
    }

    enableCartButtonInProducts(currentId) {
        var index;
        for (index = 0; index < this.products.length; index++) {
            if (this.products[index].id === currentId) {
                this.products[index].isSelected = false;
            }
        }
    }



}