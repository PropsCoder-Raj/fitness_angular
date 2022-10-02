import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-my-payment-history',
  templateUrl: './my-payment-history.component.html',
  styleUrls: ['./my-payment-history.component.scss']
})
export class MyPaymentHistoryComponent implements OnInit {

  public paymentsArray: any = [];

  constructor(public title: Title, public afs: AngularFirestore, public dataS : DataService) { }

  ngOnInit(): void {
    this.title.setTitle("Zone Fitness | My Payment History");
    if(this.dataS.paymentList.length == 0){
      this.getPayments();
    }else{
      this.paymentsArray = this.dataS.paymentList;
    }
  }

  getPayments(){
    this.afs.collection("payment").ref.where("uid", "==", localStorage.getItem("uid")).orderBy("timestamp", "desc")
      .get()
      .then((session) => {
        session.docs.map((doc) => {
          var data : any = doc.data()
          this.paymentsArray.push(data);
          this.dataS.paymentList = this.paymentsArray;
        });
      })
  }

}
