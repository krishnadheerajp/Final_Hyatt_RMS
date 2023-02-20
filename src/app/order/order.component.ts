import { Component } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  order:any;
  totalAmount:number=0;
  testAmount:number=1360;
  title:any;
  options:any;
  constructor(private itemService:ItemService,public router:Router,private auth:AuthService){}


  ngOnInit(){
    if(localStorage.getItem("user_id")==undefined){
      this.router.navigate(['login']);
    }
    this.itemService.getUserOrders().subscribe((response:any)=>{
      
      this.order=response;
      for (var val of this.order) {
        this.totalAmount+=val.pivot.amount;
      }


  this.title = 'payment';
  this.options = {
    "key": "rzp_test_1d6fFLG2Xk0leV",
    "amount": this.totalAmount*100, // Example: 2000 paise = INR 20
    "name": "Hyatt",
    "description": "description",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0avgSVDCUmmeAXSwvGbB9R5iyTGM3Q-pKZA&usqp=CAU",// COMPANY LOGO
    "handler": function (response:any) {
      // console.log(response);
      // AFTER TRANSACTION IS COMPLETE YOU WILL GET THE RESPONSE HERE.
    },
    "prefill": {
      "name": "ABC", // pass customer name
      "email": 'A@A.COM',// customer email
      "contact": '+919123456780' //customer phone no.
    },
    "notes": {
      "address": "address" //customer address 
    },
    "theme": {
      "color": "#15b8f3" // screen color
    }
};



    })
  }


  rzp1: any;

pay(){
this.rzp1 = new this.auth.nativeWindow.Razorpay(this.options);
this.rzp1.open();
}




  // Send user id from here

}
