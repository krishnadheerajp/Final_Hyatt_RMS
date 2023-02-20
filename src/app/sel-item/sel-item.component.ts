import { Component,OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sel-item',
  templateUrl: './sel-item.component.html',
  styleUrls: ['./sel-item.component.css']
})
export class SelItemComponent {
  cart:any;
  id:number=0;
  item:any=[];
  data:any;
  user_id:number=Number(localStorage.getItem("user_id"));
constructor(private itemService:ItemService,private route: ActivatedRoute,public router:Router){}

ngOnInit(){
  this.id=Number(this.route.snapshot.paramMap.get('id'));
  if(this.user_id!=0){
    this.itemService.getItem(this.id).subscribe((response:any)=>{
      // 
      this.item=response.selected_item;
      this.cart=response.cartProducts;
      // 
    })
  }
  else{
    this.itemService.showItem(this.id).subscribe((response:any)=>{
      // 
      this.item=response.selected_item;
      // 
    })
  }
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
