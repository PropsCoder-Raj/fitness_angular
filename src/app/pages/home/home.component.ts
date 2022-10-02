import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public nextSession: any;
  public nextPayment: any;
  public nextPaymentDate: any;

  constructor(public title: Title, public afs: AngularFirestore) { }

  ngOnInit(): void {
    this.title.setTitle("Zone Fitness | Home");
    this.getUserInfo();
  }

  getUserInfo() {
    this.afs.collection("client", ref => ref.where("uid", "==", localStorage.getItem("uid")))
      .valueChanges()
      .subscribe((user: any) => {
        this.nextPayment = user[0].payment_lump_sums;
        var workoutDays: any = user[0].workout_days.toString().split("");
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
          if (getDay < Number(workoutDays[i])) {
            result = Number(workoutDays[i]);
            count++;
            if (count > 0) {
              break;
            }
          }
        }
        var diff = Math.abs(Number(getDay) - Number(result));
        var nextDay = new Date()
        nextDay.setDate(today.getDate() + Number(diff));
        this.nextSession = nextDay;
        var nextPayDay = new Date()
        nextPayDay.setDate(today.getDate() + 27);
        this.nextPaymentDate = nextPayDay;
      })
  }

}
