const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

var personSchema = new Schema({
  name: { type: String, default: "", required: true },
  email: { type: String, default: "", required: true, unique: [true, "E-mail deve ser único"] },
  cpf: { type: String, default: "" },
  cnpj: { type: String, default: "" },
  fantasyName: { type: String, default: "" },
  type: { type: String, default: "" }, // Company (C) ou Participant (P)
  password: { type: String, default: "", required: true }
});

personSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

personSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Person', personSchema);
