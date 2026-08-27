import { Component, OnInit } from '@angular/core';
import { inherits } from 'node:util';
import { UserService } from '../services/user-service';
import { email } from '@angular/forms/signals';
// import { Router } from 'express';
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { IUser } from '../interfaces/IUser';

@Component({
  imports: [FormsModule],
  selector: 'app-loginpage',
  styleUrl: './loginpage.css',
  templateUrl: './loginpage.html',
})

export class Loginpage implements OnInit {

  email: string = '';
  password: string = '';
  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(){
     
  }


  onSubmit() {
    console.log("email", this.email);
    console.log("password", this.password);
    this.userService.verifyUser(this.email, this.password).subscribe((r) => {
      if (r == 1) {
        console.log("Valid user");
        this.userService.userInformation(this.email, this.password).subscribe((r: IUser) => {
          console.log("User details", r);
          localStorage.setItem("user", JSON.stringify(r));
          this.route.navigate(['/layout/dashboard'])
        })
      }
      else {
        console.log("Invalid user");
       
      }
    })

    
  }

}




