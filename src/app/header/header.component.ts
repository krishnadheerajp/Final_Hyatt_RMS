import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
user_id:any;
constructor(public router:Router){ }
ngOnInit(){
  this.user_id=localStorage.getItem("user_id");
}

logout(){
  localStorage.removeItem("user_id");
  localStorage.removeItem("role");
  localStorage.removeItem("user_token");
  location.reload();
  // this.router.navigate(['']);
}
}
