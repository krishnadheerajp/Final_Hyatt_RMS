import { IfStmt } from '@angular/compiler';
import { Component,OnInit } from '@angular/core';
import { ResolveStart } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {
[x: string]: any;
breakfastItems:any;
starterItems:any;
lunchItems:any;
drinkItems:any;
products:any;
bookings : any;
feedback : any;
role:any;

constructor(private itemService:ItemService,public router:Router){}
  ngOnInit(){
    // 
    if(localStorage.getItem("role")==null){
      this.router.navigate(['']);
    }
    else{
      this.get_bookings();
      this.get_contacts();
      this.itemService.getProducts().subscribe((response:any)=>{
        this.products = response;
        this.breakfastItems=response[0].products;
        this.starterItems=response[1].products;
        this.lunchItems=response[2].products;
        this.drinkItems=response[3].products;
        
      })
    }

  }
   deleteproduct(id:any) {
    
    this.itemService.deleteProduct(id).subscribe((response:any)=>{
      
    });
  }
  update(id:number,data:any){
    this.itemService.updateProduct(id,data).subscribe((response:any)=>{
      if(response){
        location.reload();
      }
    });
  }
  addproduct(data:any){
    this.itemService.addProduct(data).subscribe((response:any)=>{
      if(response){
        location.reload();
      }
    });
    
  }
  get_bookings(){
    this.itemService.getBookings().subscribe((response:any)=>{
      this.bookings = response;
      
    });
  }
  updatebooking(data:any){
    // 
    data.phone=Number(data.phone);
    this.itemService.updateBookings(data.id,data).subscribe((response:any)=>{
    if(response){
      location.reload();
    }
    })
  }
  get_contacts(){
    this.itemService.getContacts().subscribe((response:any)=>{
      
      this.feedback =  response;
    });
  }

}
