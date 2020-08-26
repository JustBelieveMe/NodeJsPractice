const port = "5411";

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const bcrypt = require('bcrypt');
const app = express()

app.listen(port, function () {
  console.log("server is running on " + port);
});
app.use('/static', express.static("static"));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db_con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mitac123",
  database: "human_resource"
});

db_con.connect(function (err) {
  if (err) throw err;
  console.log("DB Connected!");
});



app.get("/upload", function (req, res) {
  res.sendFile(__dirname + "/html/register.html");
});

app.post("/upload", async function (req, res) {
  // if(!req.files || Object.keys(req.files).length == 0){
  //   return res.status(400).send("No file uploaded");
  // }
  let name = req.body.name;
  let username = req.body.username;
  let password = req.body.password;
  let gender = req.body.gender;
  let email = req.body.email;
  let question = req.body.securityQ;
  let answer = req.body.answer;
  let imgFile = req.files.headShot;

  imgFile.mv("./user_data/" + employeeId + ".jpg", function (err) {
    if (err) {
      return res.status(500).send(err);
    }
  })
  console.log(req.files.headShot.name)
  await DB_CreateOrUpdate(res, name, username, password, gender, email, question, answer);
})

function DB_CreateOrUpdate(res, name, username, password, gender, email, question, answer){
  let saltRounds = 10;
  let hash_code = bcrypt.hashSync(password, saltRounds);
  data = {
    realName: String(name), 
    username: String(username),
    password: String(hash_code),
    gender: gender,
    email: String(email),
    securityQ: question,
    answer: answer,
  }
  
  let sql_com = "INSERT INTO user_data SET ?"
  
  db_con.query(sql_com, data, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
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

