require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./schemas/productSchema");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.post("/api/product", async (req, res) => {
  try {
    const {
      productName,
      number,
      materialPrice,
      additionalMaterialPrice,
      returnWaste,
      basicSalary,
      additionalSalary,
      generalProductionCosts,
    } = req.body;

    const entered = Number(number) || 1;
    const batch = 10;

    const calculate = (data) => {
      data = Number(data) || 0;
      const perUnit = data / entered;
      const perBatch = perUnit * batch;
      return { perUnit, perBatch };
    };

    const bSalary = calculate(basicSalary);
    const addSalary = calculate(additionalSalary);

    const calculateSocialContribution = () => {
      const perUnit = (bSalary.perUnit + addSalary.perUnit) * 0.22;
      const perBatch = (bSalary.perBatch + addSalary.perBatch) * 0.22;
      return { perUnit, perBatch };
    };

    const product = {
      productName: productName,
      materialPrice: calculate(materialPrice),
      additionalMaterialPrice: calculate(additionalMaterialPrice),
      returnWaste: calculate(returnWaste),
      basicSalary: bSalary,
      additionalSalary: addSalary,
      socialContribution: calculateSocialContribution(),
      productionPreparationCosts: {
        perUnit: bSalary.perUnit * 2,
        perBatch: bSalary.perBatch * 2,
      },
      generalProductionCosts: calculate(generalProductionCosts),
      administrativeExpenses: {
        perUnit: bSalary.perUnit * 1.2,
        perBatch: bSalary.perBatch * 1.2,
      },
    };

    const totalPerUnit =
      product.materialPrice.perUnit +
      product.additionalMaterialPrice.perUnit -
      product.returnWaste.perUnit +
      product.basicSalary.perUnit +
      product.additionalSalary.perUnit +
      product.socialContribution.perUnit +
      product.productionPreparationCosts.perUnit +
      product.generalProductionCosts.perUnit +
      product.administrativeExpenses.perUnit;

    product.total = {
      perUnit: totalPerUnit,
      perBatch: totalPerUnit * batch,
    };

    const newProduct = new Product(product);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
