# Crud operations on products and the categories of present products.



# user APIS
In this project user can login and register. user's authentication and authorisation is doen using jsonwebtoken library.
while creating account user has to provide name ,email and password.user's password is stored in database in encrypted format, so it is very safe.

# Category APIs 
user can access Categories if they are authorized.They can perform CRUD operations on categories.
createCategory : while creating a category user needs to provide category name and it's description.
getCategories : for list of all categories user just needs to enter their Id.
deleteCategory : for deleting a category user needs to enter their Id and name of the category which needs to be deleted. 

# Product APIs
user can access products if they are authorized.They can perform CRUD operations on products.
createProduct : while creating a product user needs to provide product name ,it's description ,price and quantity of product.
getProductByCategory : user can also get products by Specific categories by entering Product.
getSingleProduct :user can get a single product by entering products name.
getProducts : user can get list of all products
updateProduct :user can update products name ,descripton ,price or ,quanttiy also.
deleteProduct :user can also delete a specific product.
