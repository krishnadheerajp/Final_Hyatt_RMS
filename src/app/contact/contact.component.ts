import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  user_id:number=Number(localStorage.getItem("user_id"));
  msg:any;
   angForm!: FormGroup;
   constructor(private fb: FormBuilder,public itemService:ItemService,public router:Router) {
    this.createForm();
  }
  ngOnInit(){
    if(this.user_id==0){
      this.msg="Please login before filling the contact form";
     }
  }
   createForm() {
    this.angForm = this.fb.group({
       name: ['', Validators.required ],
       email: ['', Validators.required ],
       subject:['',Validators.required],
       description:['',Validators.required]
    });
  }
  Onsubmit(data:any) {
    if(this.user_id==0){
      this.router.navigate(['login']);
    }
    
    this.itemService.contactItem(data).subscribe((response:any)=>{
      if(response.success==true){
        this.msg=response.message;
      }
    });
  }
}
