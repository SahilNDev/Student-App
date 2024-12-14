const express = require('express');
const router = express.Router();
const multer = require('multer');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const Company = require('../models/Company');
const bcrypt = require('bcryptjs');

// Set up multer storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Upload files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  }
});

const upload = multer({ storage: storage });

// Student signup
router.post('/student', upload.fields([{ name: 'image' }, { name: 'resume' }]), async (req, res) => {
  try {
    const { name, description, email, studentId, department, college, password } = req.body;
    const { image, resume } = req.files; 
    
    // Check if all required fields are present
    if (!name || !email || !studentId || !department || !college || !password || !image || !resume) {
      return res.status(400).send('All fields are required');
    }
    console.log(name, email, studentId, department, college, password, image, resume)
    const existingUser = await Student.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Student already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ 
      name, 
      description, 
      image: image ? image[0].path : null, // Access the first file path
      resume: resume ? resume[0].path : null, // Access the first file path
      email, 
      studentId, 
      department, 
      college, 
      password: hashedPassword 
    });

    await student.save();
    res.status(201).send(student._id);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Admin signup
router.post('/admin', async (req, res) => {
  try {
    const { name, email, college, admin_code, password } = req.body;
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Admin already exists');
    }
    if(admin_code !== "admin1234") {
      res.status(401).send('Invalid admin code');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(password);
    console.log(hashedPassword);
    const admin = new Admin({ name, email, college, password:hashedPassword });
    await admin.save();
    res.status(201).send(admin._id);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Company signup
router.post('/company', async (req, res) => {
  try {
    const { name, email, companyName, password } = req.body;
    const existingUser = await Company.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Company already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const company = new Company({ name, email, companyName, password:hashedPassword });
    await company.save();
    res.status(201).send(company._id);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/companies', async (req, res) => {
    try {
      const uniqueCompanyNames = await Company.aggregate([
        {
          $group: {
            _id: null, // Group all documents
            companyNames: { $addToSet: "$companyName" }
          }
        },
      ]);
      if (uniqueCompanyNames.length > 0) {
        let companies = [];
        uniqueCompanyNames[0].companyNames.map((company) => {
          companies.push({id:new Date().getTime(),name:company});
        });
        res.send(companies);
      } else {
        res.send([]);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  router.get('/colleges', async (req, res) => {
      try {
        const uniqueColleges = await Admin.aggregate([
          {
            $group: {
              _id: null,
              colleges: { $addToSet: "$college" }
            }
          },
        ]);
        if (uniqueColleges.length > 0) {
          let colleges = [];
          uniqueColleges[0].colleges.map((college) => {
            colleges.push({id:new Date().getTime(),name:college});
          });
          res.send(colleges);
        } else {
          res.send([]);
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
  

module.exports = router;
