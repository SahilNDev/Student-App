const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const Company = require('../models/Company');
const bcrypt = require('bcryptjs');

// Login for all user types
router.post('/', async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    let user;
    if (userType === 'student') {
      user = await Student.findOne({ email });
    } else if (userType === 'admin') {
      user = await Admin.findOne({ email });
    } else if (userType === 'company') {
      user = await Company.findOne({ email });
    }

    if (!user) {
      return res.status(404).send('User not found');
    }
    const match = await bcrypt.compare(password, user.password);
    // Compare passwords
    if (match) {
      res.status(201).send(user._id);
    } else {
      res.status(401).send('Incorrect password');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
