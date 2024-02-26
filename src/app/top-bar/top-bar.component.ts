import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  username!:string;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("userName")!;
  }




}
