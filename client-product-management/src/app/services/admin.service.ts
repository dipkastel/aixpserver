import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {Product} from '../model/product';
import {Abase} from './abase';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  currentUser: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient, private abase: Abase) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      'Content-Type': 'application/json; charset=UTF-8'
    });
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.abase.getBaseUrl() + '/api/admin/user-update' + '', JSON.stringify(user),
      {headers: this.headers});
  }

  deleteUser(user: User): Observable<any> {
    return this.http.post(this.abase.getBaseUrl() + '/api/admin/user-delete', JSON.stringify(user),
      {headers: this.headers});
  }

  findAllUsers(): Observable<any> {
    return this.http.get(this.abase.getBaseUrl() + '/api/admin/user-all',
      {headers: this.headers});
  }

  numberOfUsers(): Observable<any> {
    return this.http.get(this.abase.getBaseUrl() + '/api/admin/user-number',
      {headers: this.headers});
  }

  // products
  createProduct(product: Product): Observable<any> {
    return this.http.post(this.abase.getBaseUrl() + '/api/admin/product-create', JSON.stringify(product),
      {headers: this.headers});
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.abase.getBaseUrl() + '/api/admin/product-update', JSON.stringify(product),
      {headers: this.headers});
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.post(this.abase.getBaseUrl() + '/api/admin/product-delete', JSON.stringify(product),
      {headers: this.headers});
  }

  findAllProducts(): Observable<any> {
    return this.http.get(this.abase.getBaseUrl() + '/api/admin/product-all',
      {headers: this.headers});
  }

  numberOfProducts(): Observable<any> {
    return this.http.get(this.abase.getBaseUrl() + '/api/admin/product-number',
      {headers: this.headers});
  }

  // transactions
  findAllTransactions(): Observable<any> {
    return this.http.get(this.abase.getBaseUrl() + '/api/admin/transaction-all',
      {headers: this.headers});
  }

  numberOfTransactions(): Observable<any> {
    return this.http.get(this.abase.getBaseUrl() + '/api/admin/transaction-number',
      {headers: this.headers});
  }
}
