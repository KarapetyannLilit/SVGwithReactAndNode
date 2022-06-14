var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path')
const bcrypt = require('bcrypt');
const db = require('../models')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid')
const appPath = require('../constants');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("uploads"))
  },
  filename: (req, file, cb) => {
   const extention =  file.originalname.split('.').pop();
    file.originalname = file.originalname.replace(file.originalname, uuidv4() +"."+ extention)
    cb(null, file.originalname)
  }
})

router.use('/uploads', express.static(appPath + '/uploads'))
router.use(express.static('public'));


const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  storage: fileStorage
});


router.use(express.json());

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Want to register' });
});

router.post("/", (req, res, next) => {
  res.redirect('/register');
});

router.get('/register', (req, res, next) => {
  res.render('register', { errorMessage: null })
});

router.post("/register", upload.single('file'), async (req, res, next) => {
  const { name, email, password, file } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)
  const filePath = req.file.path
  const src = filePath.replace(appPath, "")
  const [[emailFromSQL], fields] = await db.connection.execute(`SELECT email FROM user WHERE email = "${email}"`);

  if (emailFromSQL) {
    return res.render('register', { errorMessage: "you have account " });
  }
  else {
    const sqlUser = `INSERT INTO user (email, name, password) VALUES ('${email}','${name}', '${hashedPassword}')`;
    const querryUser = await db.connection.execute(sqlUser)
    const [[userId], fieldsId] = await db.connection.execute(`SELECT id FROM user WHERE email = "${email}"`);
    const sqlFile = `INSERT INTO files (userID, name, size,path,mimetype) VALUES ('${userId.id}','${req.file.originalname}','${req.file.size}','${src}', '${req.file.mimetype}')`;
    const querryFile = await db.connection.execute(sqlFile)

    if (querryUser && querryFile) {
      console.log("1 record inserted", querryUser);
      return res.send(`You have uploaded this image: <hr/><img src="${src}" width="500"><hr /><a href="./login">redirect to login</a>`);
    } else {
      return console.error('error connecting: ' + err.message);
    }
  }

});

router.get('/login', (req, res, next) => {
  res.render('login')
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const [[passwordFromSQL], fieldsPassword] = await db.connection.execute(`SELECT password FROM user WHERE email = "${email}"`);
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