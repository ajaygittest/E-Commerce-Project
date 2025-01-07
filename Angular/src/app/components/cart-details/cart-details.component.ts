import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{




  cartItems:CartItem[]=[];
  totalPrice:number=0;
  totalQuantity:number=0;

  constructor(private cartService:CartService){

  }

  ngOnInit(): void {
    console.log('hi')
    this.listCartDetails();

  }
  listCartDetails() {
    this.cartItems=this.cartService.cartItem;

    this.cartService.totalPrice.subscribe((data:any) =>{
      this.totalPrice=data;
    }) ;

    this.cartService.totalPrice.subscribe((data:any) =>{
      this.totalQuantity=data;
    })
  }

  incrementQuanity(theCartItem: CartItem) {
   this.cartService.addToCart(theCartItem);
    }

    decrementQuanity(theCartItem: CartItem) {
     this.cartService.decrementQuantity(theCartItem);
      }

      RemoveItem(temCartItem: CartItem) {
        this.cartService.remove(temCartItem);
        }

}
