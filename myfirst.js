
const port = "5411";


const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const { strict } = require('assert');

const app = express()

const db_con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mitac123",
  database: "human_resource"
});

app.use('/static', express.static("static"));
app.use(fileUpload());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/html/homework.html");
});

db_con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.post("/", function (req, res) {
  if(!req.files || Object.keys(req.files).length == 0){
    return res.status(400).send("No file uploaded");
  }
  let name = req.body.name;
  let username = req.body.username;
  let password = req.body.password;
  let gender = req.body.gender;
  let email = req.body.email;
  // let imgFile = req.files.headShot;
  

  imgFile.mv("./user_data/" + employeeId + ".jpg", function (err) {
    if (err) {
      return res.status(500).send(err);
    }
  })
  console.log(req.files.headShot.name)
  DB_CreateOrUpdate(res, name, username, password, gender, em);
  
  
})

app.listen(port, function () {
  console.log("server is running on " + port);
});


function DB_CreateOrUpdate(res, company, employeeId, name, gender, ability){
  // var sql_com1 = "SELECT name FROM personal_data WHERE employeeId='"+ String(employeeId) +"'";
  data = {
    company: String(company), 
    employeeId: String(employeeId), 
    name: String(name), 
    gender: gender, 
    SAability: ability[0], 
    SDability: ability[1], 
    PGability: ability[2], 
    TESTability: ability[3],
    PMability: ability[4]}
  var sql_com = "INSERT INTO personal_data SET ?"

  db_con.query(sql_com, data, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    console.log(result);
    return res.send("Add successful!");
    // if(result.length==0){
    //   sql_com = "INSERT INTO personal_data (company, employeeId, name, gender) VALUES (\"" + String(company) + "\", \"" + String(employeeId) + "\", \"" + String(name) + "\", " + gender + ")";
    //   db_con.query(sql_com, function(err, result){
    //     if(err) throw err;
    //     console.log
    //   })
    //   console.log("data not exist");
    // }
  })
  // res.send("data upload and created success!");
};