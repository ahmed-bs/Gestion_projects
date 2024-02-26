import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
declare var sb_admin_2:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private loginService : LoginService,
    public login : LoginService
  ){

  }

  ngOnInit(): void {
    
    sb_admin_2();
    
  }

  onLogout() {
    this.loginService.logout().subscribe(
      () => {
        // Additional logout logic if needed
        // window.location.reload();
      },
      (error) => {
        console.error('Logout failed:', error);
        // Handle logout failure, show error message, etc.
      }
    );
  }
  
}
