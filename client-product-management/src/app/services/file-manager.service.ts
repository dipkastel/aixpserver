import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';
import {Abase} from './abase';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  currentUser: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient, private abase: Abase) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
    });
  }

  uploadImage(file,part): Observable<any> {
    const result = this.http.post(this.abase.getBaseUrl() + '/uploadFile/'+part, file,
      {headers: this.headers});
    return result;
  }
}
