import {Injectable} from '@angular/core';

const baseApiUrl = 'http://130.185.120.230:8080/server_war';

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
