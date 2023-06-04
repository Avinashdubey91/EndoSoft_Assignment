import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private authService : AuthService, private httpService : HttpClient, private router : Router) {
    
   }

  baseUrl = "https://localhost:44338/api/User/";

  userList :  any = [];

  ngOnInit() : void{
    this.userInfo();
  }

  logout(): void{
    this.router.navigateByUrl('login');
  }

  newUserRegistration() : void {
    this.router.navigateByUrl('user-entry');
  }

  userInfo() {
      this.authService.getUserList().subscribe(data => {
        this.userList = data;
        // swal.fire(Object.entries(this.userList));
        //alert(data);
      });
  }

  
}
