import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from '../shared/data.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    products: any[];
    partialProducts: any[];
    cartProducts: any[];
    count = 0;
    constructor(private http: Http, private dataService: DataService) {}

    ngOnInit() {
        this.products = this.dataService.getProducts();
        this.cartProducts = this.dataService.getcartProducts();
        this.getProducts();

    }

    onScroll() {
        console.log("scrolled");
        if (this.count < 17) {
            this.partialProducts.push(this.products[this.count + 1]);
            this.count = this.count + 1;
        }

    }
    getPartialProducts() {
        this.partialProducts = this.products.slice(this.count, this.count + 4);
        this.count = this.count + 4;

    }

    getProducts() {
        var self = this;
        if (!this.products.length) {
            this.http.get("../assets/data/product-data.json").subscribe(
                function(response) {

                    if (response['_body']) {
                        self.products = JSON.parse(response['_body']).products;
                        self.dataService.setProducts(self.products);
                        self.getPartialProducts();
                    }
                },
                (error) => (console.log(error))
            )
        } else {
            self.getPartialProducts();
        }

    }

    onAddToCart($event) {
        var currentId = Number($event.toElement.id);
        var index;

        for (index = 0; index < this.products.length; index++) {
            if (this.products[index].id === currentId) {
                this.products[index].isSelected = true;
                this.dataService.setProducts(this.products);
                this.cartProducts.push(this.products[index]);
                this.dataService.setCartProducts(this.cartProducts);
            }
        }
        this.dataService.setCartCount();


    }

}