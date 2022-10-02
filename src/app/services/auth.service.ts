import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  public authStatus : boolean = false;
  public currentUser : any;

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service,
    public router: Router, // Inject angular router
    public afs: AngularFirestore
  ) {
    if(localStorage.getItem("uid") !== null && localStorage.getItem("uid") !== undefined && localStorage.getItem("uid") !== ""){
      this.authStatus = true;
    }else{
      this.authStatus = false;
    }
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        var fullName = result.additionalUserInfo?.profile.name;
        var email = result.additionalUserInfo?.profile.email;
        this.afs.collection("client", ref => ref.where("uid", "==", result.user?.uid)).valueChanges().subscribe((client) =>{
          if(client.length == 0){
            var docId = this.afs.createId();
            this.afs.collection("client").doc(docId).set({
              email: email,
              fullName: fullName,
              age: 0,
              docId: docId,
              timestamp: new Date(),
              group_session_rate: 40,
              individual_session_rate: 50,
              payment_lump_sums: 500,
              uid: result.user?.uid,
              workout_days: 134
            }).then((res: any) => {
                localStorage.setItem("uid", result.user?.uid);
                window.location.replace("/home")
            }).catch((error) =>{
              console.log("Error :", error);
            });
          }else{
            localStorage.setItem("uid", result.user?.uid);
            window.location.replace("/home")
          }
        })
      })
      .catch((error) => {
        console.log("Error :", error);
      });
  }

  // User Logout
  SignOut(){
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem("uid");
      window.location.replace("/login");
    });
  }

}
