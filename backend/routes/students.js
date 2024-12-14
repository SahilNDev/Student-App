const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const Company = require('../models/Company');


router.get("/college/student/:id", async (req, res) => {
    try {
        const student = await Student.findOne({_id: req.params.id});
        res.send(student.college);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get("/college/admin/:id", async (req, res) => {
    try {
        const admin = await Admin.findOne({_id: req.params.id});
        res.send(admin.college);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get("/colleges/:id", async (req, res) => {
    try {
        const students = await Student.find({college : req.params.id});
        res.send(students);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get("/student/:id", async (req, res) => {
    try {
        const student = await Student.findOne({_id: req.params.id});
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.put("/student/:id", async (req,res) => {
    console.log(req.body);
    const { name,description,email,studentId,department } = req.body;
    console.log(name,description,email,studentId,department);
        const updatedStudent = await Student.findOneAndUpdate(
            { _id: req.params.id }, // Filter
            { $set: { name, description, email, studentId, department } }, // Update
            { new: true } // Return the updated document
          );

        res.status(200).send(updatedStudent);
})

router.get("/admin/:id", async (req, res) => {
    try {
        const admin = await Admin.findOne({_id: req.params.id});
        res.send(admin);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get("/company/:id", async (req, res) => {
    try {
        const company = await Company.findOne({_id: req.params.id});
        res.send(company);
    } catch (error) {
        res.status(500).send(error);
    }
})
module.exports = router;