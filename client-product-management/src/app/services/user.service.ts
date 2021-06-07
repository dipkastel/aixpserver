import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../model/user';
import {Product} from '../model/product';
import {Transaction} from '../model/transaction';
import {Abase} from './abase';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private abase: Abase) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
    const headers = new HttpHeaders(user ? {
      authorization: 'Basic ' + btoa(user.username + ':' + user.password)
    } : {});

    return this.http.get<any> (this.abase.getBaseUrl() + '/api/user/login', { headers : headers})
    .pipe(map(response => {
      if (response) {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
      }
      return response;
    }));
  }

  logOut(): Observable<any> {
    return this.http.post(this.abase.getBaseUrl() + '/api/user/logout', {})
    .pipe(map(response => {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }));
  }

  register(user: User): Observable<any> {
    return this.http.post(this.abase.getBaseUrl()  + '/api/user/registration', JSON.stringify(user),
  {headers: {'Content-Type': 'application/json; charset=UTF-8'}});
  }
}
