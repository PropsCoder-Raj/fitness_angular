import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public sessionList = [];
  public paymentList = [];
  public myNextSession = "";
  public myNextPayment = 0;

  constructor() { }
}
