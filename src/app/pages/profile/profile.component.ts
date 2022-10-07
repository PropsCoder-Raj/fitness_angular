import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public fullName : any = "";
  public useremail : any = "";
  public phoneNumber : any = 0;
  public docId = "";
  public loader = false;

  constructor(public title: Title, public afs: AngularFirestore, public dataS: DataService) { }

  ngOnInit(): void {
    this.title.setTitle("Zone Fitness | Profile");
    if(this.dataS.fullName != "" && this.dataS.useremail != "" && this.dataS.phoneNumber != 0 && this.dataS.docId != ""){
      this.fullName = this.dataS.fullName;
      this.useremail = this.dataS.useremail;
      this.phoneNumber = this.dataS.phoneNumber;
      this.docId = this.dataS.docId;
    }else{
      this.getUserInfo();
    }
  }

  getUserInfo(){
    this.afs.collection("client").ref.where("uid", "==", localStorage.getItem("uid"))
      .get()
      .then((session) => {
        session.docs.map((doc) => {
          var data : any = doc.data()
          this.fullName = data.fullName;
          this.useremail = data.email;
          this.phoneNumber = data.phoneNumber;
          this.docId = data.docId;

          this.dataS.fullName = this.fullName;
          this.dataS.useremail = this.useremail;
          this.dataS.phoneNumber = this.phoneNumber;
          this.dataS.docId = this.docId;
        });
      })
  }

  saveProfile(){ 
    this.loader = true;
    this.afs.collection("client").doc(this.docId).update({ fullName: this.fullName, phoneNumber: this.phoneNumber, email: this.useremail }).then(() => {
      var x : any = document.getElementById("snackbarSuccess");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      setTimeout(() => {
        this.loader = false;
        window.location.reload();
      }, 500)
    });
  }

}
