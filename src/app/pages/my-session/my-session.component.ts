import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { async } from '@firebase/util';

@Component({
  selector: 'app-my-session',
  templateUrl: './my-session.component.html',
  styleUrls: ['./my-session.component.scss']
})
export class MySessionComponent implements OnInit {

  public sessionArray: any = [];

  constructor(public title: Title, public afs: AngularFirestore) { }

  ngOnInit(): void {
    this.title.setTitle("Zone Fitness | My Session");
    this.getSession();
  }

  getSession(){
    this.afs.collection("session").ref.where("uid", "==", localStorage.getItem("uid")).orderBy("timestamp", "desc")
      .get()
      .then((session) => {
        session.docs.map((doc) => {
          var data : any = doc.data()
          var name: any = "";
          this.afs.collection("session").doc(data.docId).collection("partners").ref.get()
          .then((partners) => {
            partners.docs.map((docPartner) => {
              var dataPartner : any = docPartner.data()
              name = name + "" + dataPartner.name +", ";
              console.log("name : ", name);
            })
          })
          setTimeout(() => {
            this.sessionArray.push({ ...data, name: name });
            console.log("sessionArray : ", this.sessionArray);
          }, 2000);
        })
        // session.forEach((element: any) => {
        //   var name = "";
          
          // this.afs.collection("session").doc(element.docId).collection("partners").get().forEach((ele) => {
          //   console.log("ele: ", ele.docChanges())
          // })
          // // .valueChanges()
          // // .subscribe((partners) => {
          // //   partners.forEach((elementParner : any) => {
          // //     name = name + " " + elementParner.name;
          // //     console.log("name : ", name);
          // //   })
          // // });
        //   // setTimeout(() => {
        //   //   console.log("1 name : ", name);
        //   // }, 2000);
        // })
      })
  }

}
