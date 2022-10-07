import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public sessionList = [];
  public paymentList = [];
  public myNextSession = "";
  public myNextPayment = 0;
  public fullName = "";
  public useremail = "";
  public phoneNumber = 0;
  public docId = "";

  constructor() { }
}
