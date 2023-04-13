const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const createUser = async function (req, res) {
  try {
    const requestBody = req.body;

    //______________________encrypted password_______________________//

    const salt = await bcrypt.genSalt(10);
    const createPwd = await bcrypt.hash(requestBody.password, salt);
    requestBody.password = createPwd;

    let uniqueEmail = await userModel.findOne({ email: requestBody.email });

    if (uniqueEmail) {
      return res.status(400).send({
        status: false, data: "Email Already Exists"
      });
    }
    const createData = await userModel.create(requestBody);
    return res.status(201).send({
      status: true,
      message: "User created successfully",
      data: createData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

const userLogin = async function (req, res) {
  try {
    let data = req.body;
   
    let { email, password } = data;

    let findPassword = await userModel.findOne({ email: email });
    let passwordData = await bcrypt.compare(password, findPassword.password);
    if (!passwordData) {
      return res
        .status(401)
        .send({ status: false, message: "Invalid credentials" });
    }

    let userid = await userModel.findOne({
      email: email,
      password: findPassword.password,
    });

    // creating Token
    let token = jwt.sign(
      {
        userId: userid._id,
      },
      "Secret key"
    );
    let obj = {
      userId: userid._id,
      token: token,
    };

    return res
      .status(200)
      .send({ status: true, message: "User login successfull", data: obj });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

module.exports = { createUser, userLogin }