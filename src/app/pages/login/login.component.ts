import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loader = false;

  constructor(public title: Title, public authS: AuthService) { }

  ngOnInit(): void {
    this.title.setTitle("Fitness | Login")
  }

  login(){
    this.loader = true;
    this.authS.GoogleAuth();
  }

}
