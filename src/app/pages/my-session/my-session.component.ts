import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-session',
  templateUrl: './my-session.component.html',
  styleUrls: ['./my-session.component.scss']
})
export class MySessionComponent implements OnInit {

  constructor(public title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Fitness | My Session");
  }

}
