import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    cartCount = 0;
    private subscription: Subscription;

    constructor(private dataService: DataService) {
        this.cartCount = this.dataService.getCartCount();
    }

    ngOnInit() {
        this.cartCount = this.dataService.getCartCount();
        this.subscription = this.dataService.cartItemAdded.subscribe(
            (cartCount) => {
                this.cartCount = cartCount;
            }
        )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}