import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from 'src/environments/environment';
import { getFirestore } from "firebase/firestore";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fitness_angular';

  constructor(public router: Router, public authS: AuthService){ }

  ngOnInit(): void{
    const app = initializeApp(environment.firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);
  }
}
