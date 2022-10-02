import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public fullName : any = "";
  public useremail : any = "";

  constructor(public title: Title, public afs: AngularFirestore) { }

  ngOnInit(): void {
    this.title.setTitle("Zone Fitness | Profile");
    this.getUserInfo();
  }

  getUserInfo(){
    this.afs.collection("client").ref.where("uid", "==", localStorage.getItem("uid"))
      .get()
      .then((session) => {
        session.docs.map((doc) => {
          var data : any = doc.data()
          this.fullName = data.fullName;
          this.useremail = data.email;
        });
      })
  }

}
