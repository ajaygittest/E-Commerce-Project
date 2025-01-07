import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItem: CartItem[]=[];

  totalPrice:BehaviorSubject<number>= new BehaviorSubject<number>(0);
  totalQuantity:BehaviorSubject<number>= new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(theCartItem:CartItem){

    let alreadyExitsInCart:boolean=false;
    let exisitingCart:CartItem | undefined;
    if(this.cartItem.length>0){
      exisitingCart= this.cartItem.find(temCartItem => temCartItem.id === theCartItem.id);

      alreadyExitsInCart=(exisitingCart !=undefined)
    }
    if(alreadyExitsInCart){
      exisitingCart!.quantity++;
    }else{
      this.cartItem.push(theCartItem);
    }
    this.computeTotal();
  }



  computeTotal() {
    let totalPriceValue:number=0;
    let totalQuantityVallue:number=0;

    for(let currentCartItem of this.cartItem){
      totalPriceValue+=currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityVallue +=currentCartItem.quantity;

    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityVallue);

    this.logCartData(totalPriceValue, totalQuantityVallue);
  }
  logCartData(totalPriceValue: number, totalQuantityVallue: number) {
   for(let temcartItem of this.cartItem){
    const subTotalPrice=temcartItem.quantity* temcartItem.unitPrice;
   }
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if(theCartItem.quantity===0){
      this.remove(theCartItem);
    }else{
      this.computeTotal();
    }
  }
  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItem.findIndex(temCartItem =>temCartItem.id===theCartItem.id);
    if(itemIndex >-1){
      this.cartItem.splice(itemIndex,1);
      this.computeTotal();
    }
  }


}
