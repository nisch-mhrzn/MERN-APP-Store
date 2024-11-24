const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  service: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  provider: { type: String, required: true },
  // Add more fields as needed
});

const Service = new model("Service", serviceSchema); //how it should look

module.exports = Service;
