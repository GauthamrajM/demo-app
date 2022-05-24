import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CartService } from '../cart.service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  allProducts;
  cartProduct;
  user;
  cartCount;
  constructor(private authService:AuthenticationService,
                private us:UserserviceService,
                private router:Router,
                private cs:CartService) { }

  ngOnInit(): void {
  this.user=this.authService.currentUser;
  this.getProducts();

    //cart count
    this.cs.viewCart(this.user?.username).subscribe({
      //update BahaviourSubject in UserService
      next:(res)=>{
        //console.log("CP",res)
        let userObj=res['payload']
        this.cartProduct=userObj?.products;

        this.cs.updateCartCountObservable(this.cartProduct.length)
        //get latest cartCount
          this.cs.productCountObservable.subscribe(product=>{
          this.cartCount=product;
        })
      },
      error:(error)=>{
        console.log(error)
        alert("Error in reading")
      }
    })
}

  getProtected(){
    this.us.getProtectedData().subscribe({
      next:(res)=>{
        alert(res.message)
      }
    })
  }
  
  private getProducts(){
    this.us.getProduct().subscribe({
      next:(products)=>{
        //console.log(products);
        //console.log("Products",products['payload']);
        this.allProducts=products['payload'];
        //console.log(this.allProducts[0].productName)
      },
      error:(err)=>{
        console.log("err",err);
      }
    })
  }

  addCart(username,cartProduct){
    // console.log("name",username)
    // console.log("Cart",cartProuct);
    let cartObj={
      username:username,
      products:[cartProduct]
    }
    //console.log(cartObj);
    this.cs.addCart(cartObj).subscribe({
      next:(res)=>{
        // console.log(res)
        alert("Added to cart successfully")
        //update count
        this.cs.updateCartCountObservable(this.cs.getCurrentCartCount()+1)
      },
      error:(err)=>{
        console.log("cart error",err)
      }
    })
  }

  viewCart(username){
    this.router.navigateByUrl(`/userprofile/viewcart/${username}`)
  }

}
