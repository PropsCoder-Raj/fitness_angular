import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service,
    public router: Router // Inject angular router
  ) {}

  // Check User is login or not.
  IsLogin(){
    this.afAuth.authState.subscribe((user) => {
      if(user){
        console.log("User Login");
      }else{
        console.log("User Logout");
      }
    });
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // User Logout
  SignOut(){
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
