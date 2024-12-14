const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: String,
    email: String,
  companyName: {
    type: String,
    required: true,
  },
  password: String,
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
