const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");

const createProduct = async function (req, res) {
  try {
    let requestBody = req.body;

    let Product = await productModel.create(requestBody);
    return res
      .status(201)
      .send({ status: true, message: "Success", data: Product });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

const getProductsByCategory = async function (req, res) {
  try {
    let requestBody = req.body;
    let userId = req.params.userId;
    let {
      name,
      category
    } = requestBody;


    if (req.userId != userId) {
      return res
        .status(403)
        .send({ status: false, message: "unauthorised user" });
    }

    let checkCategory = await categoryModel
      .findOne({
        name: category,
        isDeleted: false,
      })

    categoryId = checkCategory._id;

    let products = await productModel.find({ category: categoryId, isDeleted: false })

    if (products.length == 0) {
      return res
        .status(404)
        .send({ status: false, message: "No product found" });
    }

    res
      .status(200)
      .send({ status: true, message: "Success", data: products });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

const getAllProducts = async function (req, res) {
  try {

    let userId = req.params.userId;

    if (req.userId != userId) {
      return res
        .status(403)
        .send({ status: false, message: "unauthorised user" });
    }

    let products = await productModel
      .find({ isDeleted: false })

    if (products.length == 0) {
      return res
        .status(404)
        .send({ status: false, message: "No product found" });
    }


    res
      .status(200)
      .send({ status: true, message: "Success", data: products });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};


const getSingleProduct = async function (req, res) {
  try {

    let userId = req.params.userId;
    let requestBody = req.body;
    let { name } = requestBody

    if (req.userId != userId) {
      return res
        .status(403)
        .send({ status: false, message: "unauthorised user" });
    }

    let product = await productModel
      .findOne({
        name: name,
        isDeleted: false,
      })

    if (!product) {
      return res
        .status(404)
        .send({ status: false, message: "No product found" });
    }


    res
      .status(200)
      .send({ status: true, message: "Success", data: product });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

const deleteProduct = async function (req, res) {
  try {
    let requestBody = req.body;
    let userId = req.params.userId;
    let {
      name
    } = requestBody;

    if (req.userId != userId) {
      return res
        .status(403)
        .send({ status: false, message: "unauthorised user" });
    }

    let product = await productModel
      .findOne({ name, isDeleted: false })


    if (!product) {
      return res
        .status(404)
        .send({ status: false, message: "No product found" });
    }

    await productModel.findOneAndUpdate(
      { name: name },
      { $set: { isDeleted: true } }
    );

    res
      .status(200)
      .send({ status: true, message: "Success" });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

const updateProduct = async function (req, res) {
  try {

    let requestBody = req.body;
    let {
      name, category, description, price, quantity
    } = requestBody;

    let findProduct = await productModel.findOne({
      name: name,
      isDeleted: false,
    });
    if (!findProduct) {
      return res
        .status(404)
        .send({ status: false, message: " product not found" });
    }

    let updatingData = await productModel.findByIdAndUpdate(
      { name: name },
      { $set: requestBody },
      { new: true }
    );
    return res
      .status(200)
      .send({ status: true, message: "update successful", data: updatingData });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}

module.exports = { createProduct, getProductsByCategory, getSingleProduct, getAllProducts, deleteProduct, updateProduct }