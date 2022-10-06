import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public nextSession: any;
  public nextSessionDate: any;
  public nextPayment: any;
  public nextPaymentDate: any;
  public partnersCount = 0;
  public individualCount = 0;
  public gruopCount = 0;
  public group_session_rate = 0;
  public individual_session_rate = 0;
  public docId = "";

  constructor(public title: Title, public afs: AngularFirestore, public dataS: DataService) { }

  ngOnInit(): void {
    this.title.setTitle("Zone Fitness | Home");
    this.getUserInfo();
    if(this.dataS.myNextPayment != 0 && this.dataS.myNextPayment != null && this.dataS.myNextPayment != undefined){
      this.nextPayment = this.dataS.myNextPayment;
    }else{
      this.getSession()
    }
  }

  getSession() {
    this.afs.collection("session").ref.where("uid", "==", localStorage.getItem("uid")).orderBy("timestamp", "desc")
      .get()
      .then((session) => {
        session.docs.map((doc) => {
          var data: any = doc.data();
          this.afs.collection("session").doc(data.docId).collection("partners").ref.get()
            .then((partners) => {
              if (Number(partners.size) > 0) {
                this.gruopCount++;
              } else {
                this.individualCount++;
              }
            })

          setTimeout(() => {
            console.log("this.gruopCount : ", this.gruopCount);
            console.log("this.individualCount : ", this.individualCount);
            console.log("this.group_session_rate : ", this.group_session_rate);
            console.log("this.individual_session_rate : ", this.individual_session_rate);
            this.nextPayment = (Number(this.gruopCount) * Number(this.group_session_rate)) + (Number(this.individualCount) * Number(this.individual_session_rate))
            this.afs.collection("client").doc(this.docId).update({ payment_lump_sums: Number(this.nextPayment) });
            this.dataS.myNextPayment = this.nextPayment;
          }, 2000);
        });
      })
  }

  getUserInfo() {
    this.afs.collection("client").ref.where("uid", "==", localStorage.getItem("uid")).get().then((userDoc: any) => {
      userDoc.docs.map((doc: any) => {
        var user: any = doc.data();
        console.log(user);
        this.docId = user.docId;
        console.log("this.docId : " + user);
        this.group_session_rate = user.group_session_rate;
        this.individual_session_rate = user.individual_session_rate;
        // this.nextPayment = user.payment_lump_sums; // Number(user.individual_session_rate) * 4  + Number(user.group_session_rate) * 6;
        var workoutDays: any = user.workout_days.toString().split("");
        var days = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ];
        var today = new Date();
        var getDay = today.getDay();
        var count = 0;
        var result = 0;
        for (var i = 0; i < workoutDays.length; i++) {
          if (getDay <= Number(workoutDays[i])) {
            result = Number(workoutDays[i]);
            count++;
            if (count > 0) {
              break;
            }
          }
        }
        var diff = Math.abs(Number(getDay) - Number(result));

        if (diff == 0) {
          this.nextSession = "TODAY";
        } else if (diff == 1) {
          this.nextSession = "TOMORROW";
        } else {
          this.nextSession = "WEEKEND";
        }
        var nextDay = new Date();
        nextDay.setDate(today.getDate() + Number(diff));
        this.nextSessionDate = nextDay;
        var nextPayDay = new Date();
        nextPayDay.setDate(today.getDate() + 27);
        this.nextPaymentDate = nextPayDay;
      });
    })
  }

}
