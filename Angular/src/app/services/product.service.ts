import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = "http://localhost:8080/api/products";

  private categoryUrl = "http://localhost:8080/api/product-category";

  constructor(private httpclient: HttpClient) {

  }

  getProductListPaginate(thePage: number, thePageSize: number,
    thecategoryId: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${thecategoryId}`
      + `&page=${thePage}&size=${thePageSize}`;
    return this.httpclient.get<GetResponseProducts>(searchUrl);
  }



  getProductList(thecategoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${thecategoryId}`;
    return this.getProducts(searchUrl);
  }
  getProductCategory(): Observable<ProductCategory[]> {
    return this.httpclient.get<GetResponseProductCategory>(this.categoryUrl).pipe(map(response =>
      response._embedded.productCategory)
    );
  }

  searchProduct(theyKeyword: string): Observable<Product[]> {
    const searchValue = `${this.baseUrl}/search/findByNameContaining?name=${theyKeyword}`;
    return this.getProducts(searchValue);
  }

  getSearchProductPaginate(thePage: number, thePageSize: number,
    theKeyword: string): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
      + `&page=${thePage}&size=${thePageSize}`;
    return this.httpclient.get<GetResponseProducts>(searchUrl);
  }

  getProduct(productId: number): Observable<Product> {

    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpclient.get<Product>(productUrl);

  }


  private getProducts(searchValue: string): Observable<Product[]> {
    return this.httpclient.get<GetResponseProducts>(searchValue).pipe(map(response => response._embedded.products)
    );
  }
}



interface GetResponseProducts {
  _embedded: {
    products: Product[]
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[]
  }
}


