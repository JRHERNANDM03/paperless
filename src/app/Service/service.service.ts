import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  url()
  {
    const URL = 'http://localhost:3000/';
    return URL;
  }

}
