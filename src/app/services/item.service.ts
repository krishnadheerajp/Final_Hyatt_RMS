import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
 
  user_id: any;
  // token:any=localStorage.getItem("user_token");

  constructor(private httpClient: HttpClient) { }

  // To get all the items based on categories
  getItems() {
    // console.log(token);
    return this.httpClient.get("http://localhost:8000/api/categories/");
  }

  // To add items to the cart
  addtoCartItems(data: any) {
    let token=localStorage.getItem("user_token");
    let headers = { "Content-Type": "application/json", "Accept":"application/json" , "Authorization": `Bearer ${token} ` };
    return this.httpClient.post("http://127.0.0.1:8000/api/cart/add/", data, { headers });
  }

  // To get the cart items of a particular user
  getUserCartItems() {
    this.user_id = localStorage.getItem("user_id");
    let token=localStorage.getItem("user_token");
    if (this.user_id == null) return this.httpClient.get('http://localhost:8000/api/categories/');
    else{
      let headers = {"Authorization": `Bearer ${token} ` };
    return this.httpClient.get(`http://localhost:8000/api/productswithcart/${this.user_id}/`,{headers});
    }
  }

  // To get the orders placed by a user
  getUserOrders() {
    let token=localStorage.getItem("user_token");
    this.user_id = localStorage.getItem("user_id");
    let headers = {"Authorization": `Bearer ${token} ` };
    return this.httpClient.get(`http://localhost:8000/api/myorders/${this.user_id}/`,{headers});
  }

  // To remove a item from the cart
  removeFromCart(user_id: any, product_id: any) {
    let token=localStorage.getItem("user_token");
    let headers = {"Authorization": `Bearer ${token} ` };
    return this.httpClient.delete(`http://localhost:8000/api/removefromcart/${user_id}/${product_id}`,{headers});
  }

  // To update the cart based on changes made by the user
  updateCart(data: any, id: number) {
    let token=localStorage.getItem("user_token");
    let headers = { "Content-Type": "application/json", "Accept":"application/json", "Authorization": `Bearer ${token} `  };
    return this.httpClient.put(`http://localhost:8000/api/cart/update/${id}`, data, { headers });
  }

  // To get the details of a particular item based on the user
  getItem(product_id: any) {
    let token=localStorage.getItem("user_token");
    this.user_id = localStorage.getItem("user_id");
    let headers = {"Authorization": `Bearer ${token} ` };
    return this.httpClient.get(`http://localhost:8000/api/product/${this.user_id}/${product_id}`,{headers});
  }

  // To show a particular item to user without logging in
  showItem(product_id: any) {
    return this.httpClient.get(`http://localhost:8000/api/products/${product_id}`);
  }

  // To order the items from the cart
  orderItems(items: any) {
    let token=localStorage.getItem("user_token");
    let headers = { "Content-Type": "application/json", "Accept":"application/json", "Authorization": `Bearer ${token} `  };
    return this.httpClient.put(`http://localhost:8000/api/orderitems/${items}`, items, { headers });
  }

  // To post the contact form filled by the user
  contactItem(data: any) {
        let token=localStorage.getItem("user_token");
    this.user_id = localStorage.getItem("user_id");
    let headers = { "Content-Type": "application/json", "Accept":"application/json" , "Authorization": `Bearer ${token} ` };
    return this.httpClient.post(`http://localhost:8000/api/users/contact/${this.user_id}`, data, { headers });
  }

  // To post the book a table form filled by the user
  Book_table(data: any) {
        let token=localStorage.getItem("user_token");
    this.user_id = localStorage.getItem("user_id");
    let headers = { "Content-Type": "application/json", "Accept":"application/json", "Authorization": `Bearer ${token} ` };
    return this.httpClient.post(`http://localhost:8000/api/users/bookatable/${this.user_id}`, data, { headers });
  }

  // To get all the products for admin view
  getProducts() {
        let token=localStorage.getItem("user_token");
    let headers = {"Authorization": `Bearer ${token} ` };
    return this.httpClient.get('http://localhost:8000/api/products',{headers});
  }

  // To delete a particular product
  deleteProduct(product_id: any) {
        let token=localStorage.getItem("user_token");
    let headers = {"Authorization": `Bearer ${token} ` };
    return this.httpClient.delete(`http://localhost:8000/api/products/${product_id}`,{headers});
  }

  // To update a particular product
  updateProduct(product_id: any, data: any) {
         let token=localStorage.getItem("user_token");
    let headers = { "Content-Type": "application/json", "Accept":"application/json", "Authorization": `Bearer ${token} `  };
    return this.httpClient.put(`http://localhost:8000/api/products/${product_id}`, data, { headers });
  }

  // To add a new product
  addProduct(data: any) {
    let token=localStorage.getItem("user_token");
    let headers = { "Content-Type": "application/json", "Accept":"application/json", "Authorization": `Bearer ${token} `  };
    return this.httpClient.post('http://localhost:8000/api/products', data, { headers });
  }
  // To delete a particular product
  getBookings() {
         let token=localStorage.getItem("user_token");
          let headers = {"Authorization": `Bearer ${token} ` };
        return this.httpClient.get('http://127.0.0.1:8000/api/admin/bookatable',{headers});
  }

  // To update the bookings made by user
  updateBookings(id: number, data: any) {
    let token=localStorage.getItem("user_token");
    let headers = { "Content-Type": "application/json", "Accept":"application/json","Authorization": `Bearer ${token} ` };
    return this.httpClient.put(`http://127.0.0.1:8000/api/admin/bookatable/${id}`, data, { headers });
  }

  // To get all the contact queries for admin view
  getContacts() {
         let token=localStorage.getItem("user_token");
    let headers = {"Authorization": `Bearer ${token} ` };
    // console.log("getc ",token);
    return this.httpClient.get('http://localhost:8000/api/admin/contact',{headers});
  }
}
 