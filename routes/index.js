var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/students', db.getAllStudents);
router.get('/api/students/:id', db.getStudent);
router.post('/api/students', db.createStudent);
router.put('/api/students/:id', db.updateStudent);
router.delete('/api/students/:id', db.removeStudent);

module.exports = router;


