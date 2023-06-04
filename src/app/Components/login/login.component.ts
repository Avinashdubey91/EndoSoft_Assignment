import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginAuth : AuthService, private router : Router) { }

  ngOnInit() : void{

  }

  loginForm = new FormGroup({
    mobile : new FormControl("",[
      Validators.required,
      Validators.pattern("[0-9]*"),
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),
    password : new FormControl("",[
      Validators.required
    ])
  });

  isUserValid: boolean = false;

  loginSubmitted(){
    this.loginAuth.loginUser([
      this.loginForm.value.mobile = this.MobileNo.value, 
      this.loginForm.value.password = this.Password.value
    ])
    .subscribe(res => {
      if(res == 'Failure'){
        this.isUserValid = false;
        alert('Login Unsuccessful');
      }
      else{
        this.isUserValid = true;
        //alert('Login Successful');
        this.router.navigateByUrl('home')
      }
    })
  }

  get MobileNo() : FormControl{
    return this.loginForm.get("mobile") as FormControl;
  }

  get Password() : FormControl{
    return this.loginForm.get("password") as FormControl;
  }

}
