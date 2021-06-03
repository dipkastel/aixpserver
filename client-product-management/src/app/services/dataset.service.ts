import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user';
import {Dataset} from '../model/dataset';
import {Abase} from './abase';
import {DataImage} from '../model/dataImage';
import {Category} from '../model/Category';

const API_URL = 'http://localhost:8080/api/dataset/';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {
  public currentUser: User;
  private currentUserSubject: BehaviorSubject<User>;
  headers: HttpHeaders;

  constructor(private http: HttpClient, private abase: Abase) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token ,
      'Content-Type': 'application/json; charset=UTF-8'
    });
  }


  GetUserDatasets(): Observable<any> {
    return this.http.get(this.abase.getBaseUrl() + '/api/dataset/getall/',
      {headers: this.headers});
  }

  createDataset(dataset: Dataset) {
    return this.http.post(this.abase.getBaseUrl() + '/api/dataset/add', JSON.stringify(dataset),
      {headers: this.headers});
  }

  deleteDataset(dataset: Dataset) {
    return this.http.get(this.abase.getBaseUrl() + '/api/dataset/delete/'+dataset.id,{headers: this.headers});
  }

  createImageForDataset(image: DataImage) {
    return this.http.post(this.abase.getBaseUrl() + '/api/dataset/addimage', JSON.stringify(image),
      {headers: this.headers});
  }

  GetDatasetImages(datasetId : number): Observable<any> {
    return this.http.get(this.abase.getBaseUrl() + '/api/dataset/getDatasetImages/'+datasetId,
      {headers: this.headers});
  }


  getAllCategories(): Observable<any> {
    return this.http.get(this.abase.getBaseUrl() + '/api/dataset/getallcategories/',
      {headers: this.headers});
  }

  addCategory(newCategory: Category):Observable<any> {
    return  this.http.post(this.abase.getBaseUrl()+'/api/dataset/addcategorie/',newCategory,{headers: this.headers});
  }
}
