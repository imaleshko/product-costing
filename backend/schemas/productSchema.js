const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    perUnit: { type: Number },
    perBatch: { type: Number },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    materialPrice: itemSchema,
    additionalMaterialPrice: itemSchema,
    returnWaste: itemSchema,
    basicSalary: itemSchema,
    additionalSalary: itemSchema,
    socialContribution: itemSchema,
    productionPreparationCosts: itemSchema,
    generalProductionCosts: itemSchema,
    administrativeExpenses: itemSchema,
    total: itemSchema,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
