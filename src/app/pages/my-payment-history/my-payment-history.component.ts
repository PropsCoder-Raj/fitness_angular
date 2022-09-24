import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-payment-history',
  templateUrl: './my-payment-history.component.html',
  styleUrls: ['./my-payment-history.component.scss']
})
export class MyPaymentHistoryComponent implements OnInit {

  constructor(public title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Zone Fitness | My Payment History");
  }

}
