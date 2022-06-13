var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path')
const bcrypt = require('bcrypt');
// const mysql = require('mysql2');
const mysql = require('mysql2/promise');

router.use(express.json());

// const connectToDB = async ()=>{
//   const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'lilit',
//     password: '$l5i9l1i7t$',
//     database: 'appregister',
//     port: 3306
//   });
// }

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Want to register' });
});

router.get('/hhh', (req, res, next) => {
  res.render('index', { title: 'Want to register' });
});

router.post("/", (req, res, next) => {
  res.redirect('/register');
});

router.get('/register', (req, res, next) => {
  res.render('register')
});

router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'lilit',
    password: '$l5i9l1i7t$',
    database: 'appregister',
    port: 3306
  });
  const [[emailFromSQL], fields] = await connection.execute(`SELECT email FROM user WHERE email = "${email}"`);
  if (emailFromSQL) {
    console.log("you have account ");
    res.redirect(200, '/login');
  }
  else {
    const sql = `INSERT INTO user (email, name, password) VALUES ('${email}','${name}', '${hashedPassword}')`;
    connection.query(sql, function (err, result) {
      if (err) {
        console.error('error connecting: ' + err.message);
        return;
      }
      console.log("1 record inserted", result);
      res.redirect(200, '/login');
    });
  }
});

router.get('/login', (req, res, next) => {
  res.render('login')
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'lilit',
    password: '$l5i9l1i7t$',
    database: 'appregister',
    port: 3306
  });
  const [[passwordFromSQL], fieldsPassword] = await connection.execute(`SELECT password FROM user WHERE email = "${email}"`);
  console.log(passwordFromSQL.password);
  if (passwordFromSQL) {
    if (bcrypt.compareSync(password, passwordFromSQL.password) === true) {
      console.log("Password matches!")
      res.status(200).json({ msg: "Login success" })
      return
    } else {
      console.log("Password doesn't match!")
      res.status(401).json({ msg: "Invalid credencial" })
      return
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
    console.log(error)
  }
});
module.exports = router;




// fs.promises.readFile(path.resolve("data.json"), "utf8").then((users) => {
//   // const filterdWithEmail = JSON.parse(users).filter(word => word.email === email);
//   // const aauthenticatedUser = filterdWithEmail.filter((user) => bcrypt.compareSync(password, user.password) === true)
//   const authenticatedUser = JSON.parse(users).filter(word => word.email === email).filter((user) => bcrypt.compareSync(password, user.password) === true)
//   if (authenticatedUser.length != 0) {
//     console.log("Password matches!")
//     res.status(200).json({ msg: "Login success" })
//     return
//   } else {
//     console.log("Password doesn't match!")
//     res.status(401).json({ msg: "Invalid credencial" })
//     return
//   }
// }).catch(error => {
//   res.status(401).json({ error: "User does not exist" });
//   console.log(error)
// });;

  // connection.execute(
  //   `SELECT email FROM user WHERE email = "${email}" AND password = "${hashedPassword}"`,
  //   function (err, results, fields) {
  //     console.log(results);
  //     if (results) {
  //       res.redirect(200, '/login');
  //     } else {
  //       const sql = `INSERT INTO user (email, name, password) VALUES ('${email}','${name}', '${hashedPassword}')`;
  //       connection.query(sql, function (err, result) {
  //         if (err) {
  //           console.error('error connecting: ' + err.message);
  //           return;
  //         }
  //         console.log("1 record inserted", result);
  //         res.redirect(200, '/login');
  //       });
  //     }

  //   }
  // );