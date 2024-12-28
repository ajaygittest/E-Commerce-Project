import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list.component.html',
  //templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {


  products:Product[]=[];
  currentCategoryId:number=1;
  searchMode:boolean=false;

  constructor(private productService:ProductService, private route:ActivatedRoute){

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
    const theyKeyword=this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProduct(theyKeyword!).subscribe((data:any)=>{
      this.products=data;
    })
  }

  handleListProduct(){
    const hasCategory:boolean=this.route.snapshot.paramMap.has('id');

    if(hasCategory){
      this.currentCategoryId=+this.route.snapshot.paramMap.get('id')!;
    }else{
      this.currentCategoryId=1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data =>{
        this.products=data;
        console.log(this.products)
      }
    )

  }



}
