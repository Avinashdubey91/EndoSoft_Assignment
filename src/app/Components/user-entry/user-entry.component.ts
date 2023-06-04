import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./user-entry.component.css']
})
export class UserEntryComponent implements OnInit {
  repeatPassword : string = 'none';
  displayMessage : string = '';
  isAccountCreated: boolean = false;

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() : void {

  }
  userEntryForm = new FormGroup({
    firstName : new FormControl("", [
      Validators.required, 
      Validators.minLength(4), 
      Validators.pattern("[a-zA-Z].*")
    ]),
    lastName : new FormControl("", [
      Validators.required, 
      Validators.minLength(2), 
      Validators.pattern('[a-zA-Z].*')
    ]),
    address : new FormControl("", [
      Validators.required,
      Validators.minLength(4),
    ]),
    mobile : new FormControl("", [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),
    dob : new FormControl(new Date().toISOString().slice(0, 10)),
    pwd : new FormControl("",[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8)
    ]),
    rpwd : new FormControl("",[
      Validators.required
    ])
  })

  userEntrySubmitted(){
    if(this.Password.value == this.RetypePassword.value){
      console.log(this.userEntryForm.valid);
      this.repeatPassword = 'none';

      this.authService.userRegistration([
        this.userEntryForm.value.firstName = this.FirstName.value,
        this.userEntryForm.value.lastName = this.LastName.value,
        this.userEntryForm.value.address = this.Address.value,
        this.userEntryForm.value.mobile = this.Mobile.value,
        this.userEntryForm.value.dob = this.DOB.value,
        this.userEntryForm.value.pwd = this.Password.value
      ])
      .subscribe((res) => {
        if(res == 'Success'){
          this.displayMessage = 'User Added Successfully';
          this.isAccountCreated = true;
          this.userEntryForm.reset();
          this.router.navigateByUrl('home');
        }
        else if(res == 'Already Exist'){
          this.displayMessage = 'User Already Exist. Try with another Mobile No.';
          this.isAccountCreated = false;
        }
        else{
          this.displayMessage = 'Something Went Wrong';
          this.isAccountCreated = false;
        }
      });
    }
    else{
      this.repeatPassword = 'Inline';
    }
  }

  getUserInfo() : void {
    this.router.navigateByUrl('home');
  }

  get FirstName() : FormControl{
    return this.userEntryForm.get("firstName") as FormControl;
  }

  get LastName() : FormControl{
    return this.userEntryForm.get("lastName") as FormControl;
  }

  get Address() : FormControl{
    return this.userEntryForm.get("address") as FormControl;
  }

  get Mobile() : FormControl{
    return this.userEntryForm.get("mobile") as FormControl;
  }

  get DOB() : FormControl{
    return this.userEntryForm.get("dob") as FormControl;
  }

  get Password() : FormControl{
    return this.userEntryForm.get("pwd") as FormControl;
  }

  get RetypePassword() : FormControl{
    return this.userEntryForm.get("rpwd") as FormControl;
  }

}
