import {Injectable} from '@angular/core';

const baseApiUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class Abase {
  constructor() {
  }
  public getBaseUrl() {
    return baseApiUrl;
  }

}
