const express = require('express');
const router = express.Router();
const middleWares=require("../middlewares/auth");
const productController=require("../controllers/productController")
const categoryController=require("../controllers/categoryController")
const userController=require("../controllers/userController")


 //========================USER API================//

 router.post('/register',userController.createUser)
 router.post('/login',userController.userLogin)



// //===========================CATEGORIES API===============//

router.post("/category/:userId",middleWares.authenticate,categoryController.createCategory)
router.get('/category/:userId',middleWares.authenticate,categoryController.getCategories)
router.delete('/category/:userId',middleWares.authenticate, categoryController.deleteCategory)


// //===========================PRODUCT API===============//

router.post("/products/:userId",middleWares.authenticate,productController.createProduct)
router.get('/products/:userId',middleWares.authenticate,productController.getAllProducts)
router.get('/productsByCategory/:userId',middleWares.authenticate, productController.getProductsByCategory)
router.get('/singleProduct/:userId',middleWares.authenticate, productController.getSingleProduct)
router.put('/products/:userId',middleWares.authenticate,productController.updateProduct)
router.delete('/products/:userId',middleWares.authenticate, productController.deleteProduct)




module.exports = router;