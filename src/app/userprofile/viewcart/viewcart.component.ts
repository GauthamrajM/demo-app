import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { CartService } from 'src/app/cart.service';
import { UserserviceService } from 'src/app/userservice.service';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.scss']
})
export class ViewcartComponent implements OnInit {
  user;
  cartProduct;
  constructor(private authService:AuthenticationService,
    private cs:CartService,) { }

  ngOnInit(): void {
    this.user=this.authService.currentUser;
    this.viewCart(this.user.username);
  }

  private viewCart(username){
    this.cs.viewCart(username).subscribe({
      next:(res)=>{

        let userObj=res['payload']
        //console.log(user)
        this.cartProduct=userObj.products;
        
        //console.log("cart product",this.cartProduct)
        // this.router.navigateByUrl(`/userprofile/viewcart/${username}`)
      },
      error:(err)=>{
        console.log("viewcart err",err)
      }
    })
  }

  removeCart(id){
    // console.log(id);

      this.cs.deleteCartProductbyId(id).subscribe({
        next:(response)=>{
          console.log(response)
          //alert("User removed");
        }
        ,
        error:(error)=>{
          console.log("err is ",error)
        }
      })
    } 
  
}
