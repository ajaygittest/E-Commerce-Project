import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl="http://localhost:8080/api/products";

  private categoryUrl="http://localhost:8080/api/product-category";

  constructor(private httpclient:HttpClient) { 

  }

  getProductList(thecategoryId:number):Observable<Product[]>{

    console.log(thecategoryId)
    const searchUrl= `${this.baseUrl}/search/findByCategoryId?id=${thecategoryId}`;
    console.log(searchUrl);
    return this.httpclient.get<GetResponseProducts>(searchUrl).pipe(map(response =>
      response._embedded.products
    ));
  }
  getProductCategory():Observable<ProductCategory[]> {
    return this.httpclient.get<GetResponseProductCategory>(this.categoryUrl).pipe(map(response  => 
      response._embedded.productCategory)
    );
  }
}

interface GetResponseProducts{
  _embedded:{
    products:Product[]
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[]
  }
}


