const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  description: String,
  image : {type:String, default: null},
  resume: {type:String, default: null},
  email: String,
  studentId: String,
  department: String,
  college: String,
  password: String,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
