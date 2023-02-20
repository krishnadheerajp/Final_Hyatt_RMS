import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
items:any;
breakfastItems:any;
starterItems:any;
lunchItems:any;
drinkItems:any;
data:any;
user_id:number=Number(localStorage.getItem("user_id"));
message:any;
pid:any;
cart:any;
constructor(private itemService:ItemService,public router:Router){}
ngOnInit(){
  this.itemService.getUserCartItems().subscribe((response:any)=>{
    
    if(this.user_id==0){
      this.breakfastItems=response[0].products;
      this.starterItems=response[1].products;
      this.lunchItems=response[2].products;
      this.drinkItems=response[3].products;
    }
    else{
      this.breakfastItems=response.all_products[0].products;
      this.starterItems=response.all_products[1].products;
      this.lunchItems=response.all_products[2].products;
      this.drinkItems=response.all_products[3].products;
      this.cart=response.cartProducts;
    }

    });
}
addToCart(product_id:any,product_price:any){
  if(this.user_id==0){
      this.router.navigate(['login']);
  }
  else{
    this.data={"user_id":this.user_id,"product_id":product_id,"amount":product_price};
    
    this.itemService.addtoCartItems(this.data).subscribe((response:any)=>{
      
      if(response.success===true){
        this.cart=response.cartProducts;
        // 
      }
    });
  }
}

  checkInCart(product:any){
    if(this.user_id!=0){
      let cp=this.cart.find((p:any)=>{
        // 
        return p.pivot.user_id==this.user_id && p.pivot.product_id==product.id;
      })
      if(cp===undefined){
        return false;
      }
      return true;
    }
    return false;
  }
  removeFromCart(product_id:any){
    this.itemService.removeFromCart(this.user_id,product_id).subscribe((response:any)=>{
        if(response.success===true){
          this.cart=response.cartProducts;
          // 
        }
    });
  }
}
