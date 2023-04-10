const categoryModel = require("../models/categoryModel");

const createCategory = async function (req, res) {
    try {
        let requestBody = req.body;
        let Category = await categoryModel.create(requestBody);
        return res
            .status(201)
            .send({ status: true, message: "Success", data: Category });
    } catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
};

const getCategories = async function (req, res) {
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

        let categories = await categoryModel
            .find({
                name:name,
                isDeleted: false,
              })


        if (categories.length == 0) {
            return res
                .status(404)
                .send({ status: false, message: "No category found" });
        }

        res
            .status(200)
            .send({ status: true, message: "Success", data: categories });
    } catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
};

const deleteCategory = async function (req, res) {
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

        let category = await categoryModel
            .findOne({name,isDeleted: false})


        if (!category) {
            return res
                .status(404)
                .send({ status: false, message: "No category found" });
        }

        await categoryModel.findOneAndUpdate(
            { name: name },
            { $set: { isDeleted: true} }
          );

        res
            .status(200)
            .send({ status: true, message: "Success" });
    } catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
};

module.exports = { createCategory, getCategories, deleteCategory }