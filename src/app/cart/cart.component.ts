import { Component,OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private itemService:ItemService,public router:Router,private auth:AuthService){}
  cart:any;
  totalAmount:number=0;
  itemIds:any=[];
  message:any;
  title:any;
  options:any;
  // Send user id from here
  ngOnInit(){
    if(localStorage.getItem("user_id")==undefined){
      this.router.navigate(['login']);
    }
    else{
      this.itemService.getUserCartItems().subscribe((response:any)=>{
      
        this.cart=response.cartProducts;
        for (var val of this.cart) {
          this.totalAmount+=val.pivot.amount;
        }
        for (let i=0;i<this.cart.length;i++) {
          this.itemIds[i]=this.cart[i].pivot.id;
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
        
      });


    }
  }

  updateCart(index:number,sign:string){
    if(sign=="plus"){
      this.cart[index].pivot.quantity+=1;
      this.totalAmount+=this.cart[index].price;
    }
    else{
      this.cart[index].pivot.quantity-=1;
      this.totalAmount-=this.cart[index].price;
    }
    this.cart[index].pivot.amount=this.cart[index].pivot.quantity*this.cart[index].price;

    let body={"quantity":this.cart[index].pivot.quantity,"amount":this.cart[index].pivot.amount};

    if(this.cart[index].pivot.quantity>0){
      this.itemService.updateCart(body,this.cart[index].pivot.id).subscribe((response)=>{
          
      });
    }
    else{
      this.itemService.removeFromCart(this.cart[index].pivot.user_id,this.cart[index].pivot.product_id).subscribe((response:any)=>{
        if(response.success===true)
        {
          this.cart=response.cartProducts;
          this.itemIds=[];
          for (let i=0;i<this.cart.length;i++) {
            this.itemIds[i]=this.cart[i].pivot.id;
          }
          
        }
      })
    }
  }

  orderItems(data:any){
    let itemIdsstring="";
    
    for (let i=0;i<data.length;i++) {
      itemIdsstring+=data[i]+" ";
    }
    
    this.itemService.orderItems(itemIdsstring).subscribe((response:any)=>{
      
      this.message=response.message;
      this.cart=[];
      this.totalAmount=0;
      this.itemIds=[];
    });
  }

  rzp1: any;

  pay(){
  this.rzp1 = new this.auth.nativeWindow.Razorpay(this.options);
  this.rzp1.open();
  }
}
