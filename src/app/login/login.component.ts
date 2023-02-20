import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

declare function toggleForm():any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private UserService:UserService, public router:Router){}
  values:any;
  msg:any;
  register(values:any){
    // 
    this.values = values;
        this.UserService.createUser(this.values).subscribe((response:any)=>{
          if(response){
            toggleForm();
            this.msg="Please login with your new credentials";
          }
    })
  }
   
  ngOnInit(){

  }
   
  login(values:any){
    this.values = values;
    this.UserService.loginUser(this.values).subscribe((response:any)=>{
  
  localStorage.setItem("user_id", response.user.id);
  localStorage.setItem("user_token", response.token);
  if(response.user.role==1){
    localStorage.setItem("role",response.user.role);
    localStorage.setItem("user_token", response.token);
    this.router.navigate(['admin']);
  }
  else{
    this.router.navigate(['']);
  }
})
  }

}

