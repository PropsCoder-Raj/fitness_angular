import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fitness_angular';

  constructor(public router: Router){ }

  ngOnInit(): void{
    const app = initializeApp(environment.firebaseConfig);
    const analytics = getAnalytics(app);
  }
}
