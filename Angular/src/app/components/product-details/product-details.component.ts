import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {


  product!:Product;

  constructor(private router:ActivatedRoute, private productService:ProductService,
    private cartService:CartService
  ){

  }
  ngOnInit(): void {
    this.router.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    const productId:number=+this.router.snapshot.paramMap.get('id')!;
    this.productService.getProduct(productId).subscribe((data:any) =>{
      this.product=data;
    })
  }

  addToCart() {
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
    }

}
