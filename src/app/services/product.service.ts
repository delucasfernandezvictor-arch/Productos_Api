import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products';

  /**
   * Obtiene los productos paginados desde DummyJSON
   * @param limit Cantidad de productos por página (por defecto 15)
   * @param skip Desplazamiento / offset
   */
  getProducts(limit: number = 15, skip: number = 0): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${this.apiUrl}?limit=${limit}&skip=${skip}`);
  }
}