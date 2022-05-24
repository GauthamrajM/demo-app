import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private hc:HttpClient) { }

  createUser(userObj):Observable<any>{
    return this.hc.post('/user/create-user',userObj)
  }

  createproduct(productObj):Observable<any>{
    return this.hc.post('/admin/create-product',productObj);
  }

  //make req to protected route
  getProtectedData():Observable<any>{
    return this.hc.get('/user/get-protected-data')
  }

  getProduct():Observable<any[]>{
    return this.hc.get<any[]>('/admin/view-products');
  }

  updateProduct(modifyProduct):Observable<any>{
    return this.hc.put(`/admin/update-product/${modifyProduct.id}`,modifyProduct)
  }
  
  deleteProductbyId(id):Observable<any>{
    return this.hc.delete(`/admin//delete/${id}`);
  }
}
