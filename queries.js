var promise = require('bluebird');

var options = {  
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
// var connectionString = 'postgres://localhost:5432/sis';
var connectionString = 'postgres://hxkljkazyhcrzf:4536b99ee603e0664228a54fc3d0ac74af34ba53b38abe7d86231e19880f9413@ec2-107-22-167-179.compute-1.amazonaws.com:5432/dc30mickgjtba1';
var db = pgp(connectionString);


function getAllStudents(req, res, next) {
  db.any('select * from students')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all students'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getStudent(req, res, next) {
  var studentID = parseInt(req.params.id);
  db.one('select * from students where id = $1', studentID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one student'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function createStudent(req, res, next) {  
  db.none('insert into students(first_name, last_name, email, gender, phone)' +
      'values(${first_name}, ${last_name}, ${email}, ${gender}, ${phone})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one student'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function updateStudent(req, res, next) {
  db.none('update students set first_name=$1, last_name=$2, email=$3, gender=$4, phone=$5 where id=$6',
    [req.body.first_name, req.body.last_name, 
       req.body.email,req.body.gender, req.body.phone, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated student'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeStudent(req, res, next) {
  var studentID = parseInt(req.params.id);
  db.result('delete from students where id = $1', studentID)
    .then(function (result) {
      
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} student`
        });
     
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllStudents: getAllStudents,
  getStudent: getStudent,
  createStudent: createStudent,
  updateStudent: updateStudent,
  removeStudent: removeStudent
};
