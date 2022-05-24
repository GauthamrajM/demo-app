import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private hc:HttpClient) { }

  //create object for BehaviourSubject
  productCountSubject=new BehaviorSubject<any>(0);
  
  //create observable   
  productCountObservable=this.productCountSubject.asObservable();

  //to update value of BahaviourSubject
  updateCartCountObservable(latestCartCount){
    this.productCountSubject.next(latestCartCount)
  }
  //to get current count
  getCurrentCartCount(){
    return this.productCountSubject.getValue()
  }


  addCart(cartObj):Observable<any>{
    return this.hc.post('/cart/create-cart',cartObj)
  }

  viewCart(username):Observable<any[]>{
    return this.hc.get<any[]>(`/cart/view-cart/${username}`)
  }
  
  deleteCartProductbyId(id):Observable<any>{
    return this.hc.delete(`/cart/delete/${id}`);
  }
}
