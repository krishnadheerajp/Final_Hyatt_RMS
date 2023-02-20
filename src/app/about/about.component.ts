import { Component } from '@angular/core';
import {User} from '../user.interface';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  user_id:number=Number(localStorage.getItem("user_id"));
  msg:any;
  constructor( private itemService:ItemService,public router:Router) 
  {}
  public user!: User; 
  ngOnInit() { 
   this.user = {
   name: '',
   email: '',
   phone: 0,
   date: '',
   time: '',
   nop: 0,
   message: ''
   }
   if(this.user_id==0){
    this.msg="Please login before booking the table";
   }

   };
  
   ngSubmit(data:any)
   {
    if(this.user_id==0){
      this.router.navigate(['login']);
    }
     this.itemService.Book_table(data).subscribe((response:any)=>{  
        if(response.success==true){
          this.msg=response.message;
        }
     })
   };

}
