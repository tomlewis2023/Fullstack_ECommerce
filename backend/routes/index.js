const express = require('express')
const router = express.Router()
const userSignupcontroller = require('../controller/userSignup')
const userSignincontroller = require('../controller/userSignin')
const userDetailController = require('../controller/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/userLogout')
const allUsersController = require('../controller/allUsers')
const updateUserController = require('../controller/updateUser')
const UploadProductController = require('../controller/uploadProduct')
const getProductController = require('../controller/getProduct')
const updateProductController = require('../controller/updateProduct')
const getCategoryProduct = require('../controller/getCategoryProduct')
const getCategoryWiseProduct = require('../controller/getCategoryWiseProduct')
const getProductDetails = require('../controller/getProductDetails')
const addToCartController = require('../controller/addToCartController')
const countAddtoCartProduct = require('../controller/countAddtoCartProduct')
const addToCartViewProduct = require('../controller/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/deleteAddToCartProduct')
const searchProduct = require('../controller/searchProduct')
const filterProductController = require('../controller/filterProduct')
const paymentController = require('../controller/order/paymentController')
const webhooks = require('../controller/order/webhook')
const orderController = require('../controller/order/orderController')
const allOrderController = require('../controller/order/allordercontroller')

 


router.post("/signup",userSignupcontroller)
router.post("/signin",userSignincontroller)
router.get("/userdetails",authToken,userDetailController)
router.get("/userlogout",userLogout)


//Admin panel

router.get("/allusers",authToken,allUsersController)

router.post("/updateuser",authToken,updateUserController)

//product

router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//useraddtocart

router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken, countAddtoCartProduct)
router.get("/view-cart-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)


//Payment and order

router.post("/checkout",authToken,paymentController)
router.post("/webhook",webhooks) //api webhook
router.get("/order-list",authToken,orderController)
router.get("/all-orders",authToken,allOrderController)



module.exports = router