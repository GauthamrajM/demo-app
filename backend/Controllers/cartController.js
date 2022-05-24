const expressAsyncHandler = require("express-async-handler");


//create cart
const createCart = expressAsyncHandler(async (req, res) => {

    //get cartCollection Obj from req
    let cartCollectionObject = req.app.get("cartCollectionObject");
    //console.log(req.body)
    //get new cart obj
    let cartObj = req.body;
    //console.log("CP",cartObj.products)
    
    //check for availabity of username
    let cartOfDB=await cartCollectionObject.findOne({username:cartObj.username})
    //console.log(cartOfDB)
    
    //if user already existed
    if(cartOfDB!==null){
        let product=cartObj.products[0];
        //console.log(product)
        let result= await cartCollectionObject.updateOne({username:cartObj.username},{$push:{products:product}})
        //console.log(result)
        //console.log("res",result)
        res.status(200).send({message:"Cart Product updated"})
    }
    else{
    //insert into cart colelction
    let result=await cartCollectionObject.insertOne(cartObj)
    //send res
    res.status(201).send({message:"Cart created"})
    }
})

const viewCart=expressAsyncHandler(async(req,res)=>{
    //get cartCollection Obj from req
    let cartCollectionObject = req.app.get("cartCollectionObject");
    
    //get cart data from cartcollection and pack them into an array
    // let products = await cartCollectionObject.find().toArray()
    // console.log(products)    
    //get username from url
    let usernameOfUrl =   req.params.username;
    // console.log("user",usernameOfUrl)
    //get user by id from usercollection
    let cart = await cartCollectionObject.findOne({username:usernameOfUrl})
    //send res
    res.status(200).send({message:"List of products" ,payload:cart})
})

const deleteProduct = expressAsyncHandler(async(req,res)=>{
    
    //get usercollection obj from req
    let cartCollectionObject = req.app.get("cartCollectionObject");
    
    //get username from url
    let productFromUrl =   (+req.params.id);
    console.log(productFromUrl)
    //get user by id from usercollection
    let result = await cartCollectionObject.deleteOne({products:productFromUrl},{$pull:{products:productFromUrl}})
     console.log(result)
    //send res
    if(result.deletedCount==1){
        res.status(204).send({message:"Product removed"})
    }
    else{
        res.send({message:"Error in removing"})
    }

})

//export 
    module.exports={createCart,viewCart,deleteProduct};