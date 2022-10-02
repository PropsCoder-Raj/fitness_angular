import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-payment-history',
  templateUrl: './my-payment-history.component.html',
  styleUrls: ['./my-payment-history.component.scss']
})
export class MyPaymentHistoryComponent implements OnInit {

  public paymentsArray: any = [];

  constructor(public title: Title, public afs: AngularFirestore) { }

  ngOnInit(): void {
    this.title.setTitle("Zone Fitness | My Payment History");
    this.getPayments();
  }

  getPayments(){
    this.afs.collection("payment").ref.where("uid", "==", localStorage.getItem("uid")).orderBy("timestamp", "desc")
      .get()
      .then((session) => {
        session.docs.map((doc) => {
          var data : any = doc.data()
          this.paymentsArray.push(data);
        });
      })
  }

}
