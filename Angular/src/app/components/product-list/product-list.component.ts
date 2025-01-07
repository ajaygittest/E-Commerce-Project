import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list.component.html',
  //templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {



  products:Product[]=[];
  previousCategoryId: number=1;
  currentCategoryId:number=1;
  searchMode:boolean=false;

  //Pagination Properties
  thePageNumber:any=1;
  thePageSize:number=5;
  theTotalElements:number=0;


  previousKeyword:string='';

  constructor(private productService:ProductService, private route:ActivatedRoute
    ,private cartService: CartService
  ){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProduct();
    })
  }
  listProduct() {

    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProduct();
    }else{
    this.handleListProduct();
    }
  }
  handleSearchProduct() {
    const theyKeyword=this.route.snapshot.paramMap.get('keyword')!;
    if(this.previousKeyword != theyKeyword){
      this.thePageNumber=1; 
    }
    this.previousKeyword!=theyKeyword;
    this.productService.getSearchProductPaginate(this.thePageNumber-1,this.thePageSize,theyKeyword).subscribe(this.prcessResult()); 
  }

  updatePageSize(selectedSize: string) {

    this.thePageSize=+selectedSize;
    this.thePageNumber=1;
    this.listProduct();
    }

  handleListProduct(){
    const hasCategory:boolean=this.route.snapshot.paramMap.has('id');

    if(hasCategory){
      this.currentCategoryId=+this.route.snapshot.paramMap.get('id')!;
    }else{
      this.currentCategoryId=1;
    }

    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber=1;
    }

    this.previousCategoryId=this.currentCategoryId;

    this.productService.getProductListPaginate(this.thePageNumber-1,
      this.thePageSize,this.currentCategoryId
    ).subscribe(this.prcessResult());

  }

  prcessResult(){
    return (data:any)=>{
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    }
  }

  addToCart(product: Product) {
    const theCartItem= new CartItem(product);

    this.cartService.addToCart(theCartItem);

    }



}
