import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    itemCount: number;
    cartProducts;
    total = 0;
    private subscription: Subscription;
    @ViewChild('productCount') productCount;

    constructor(private dataService: DataService, private router: Router) {
        this.cartProducts = this.dataService.getcartProducts();
    }

    ngOnInit() {
        this.cartProducts = this.dataService.getcartProducts();
        this.subscription = this.dataService.cartProductAdded.subscribe(
            (cartProducts) => {
                this.cartProducts = cartProducts;
            }
        )
        this.calculateTotal();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    valuechange(newValue, product) {
        var currentId = product.id,
            index;
        this.cartProducts = this.dataService.getcartProducts();
        for (index = 0; index < this.cartProducts.length; index++) {
            if (this.cartProducts[index].id === currentId) {
                this.cartProducts[index].count = Number(newValue);
            }
        }
        this.dataService.setCartProducts(this.cartProducts);
        this.calculateTotal();

    }

    onRemoveFromCart($event) {
        var currentId = Number($event.toElement.id);
        var index;

        for (index = 0; index < this.cartProducts.length; index++) {
            if (this.cartProducts[index].id === currentId) {
                this.cartProducts[index].isSelected = true;
                this.cartProducts.splice(index, 1);
                this.dataService.setCartProducts(this.cartProducts);
                this.dataService.enableCartButtonInProducts(currentId);
            }
        }
        this.dataService.setCartCount();
        this.calculateTotal();
    }

    calculateTotal() {
        this.total = 0;
        var index, cartProducts = this.dataService.getcartProducts();
        for (index = 0; index < cartProducts.length; index++) {
            this.total = this.total + (Number(cartProducts[index].price) * Number(cartProducts[index].count));
        }
    }

    onEditCart() {
        this.router.navigate(['/product']);
    }

}