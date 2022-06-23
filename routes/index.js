var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path')
const bcrypt = require('bcrypt');
const db = require('../models')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid')
const appPath = require('../constants').default;


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("uploads"))
  },
  filename: (req, file, cb) => {
    const extention = file.originalname.split('.').pop();
    file.originalname = uuidv4() + "." + extention;
    console.log(upload.limits.mimetype[file.mimetype], file.mimetype);

    cb(null, file.originalname)
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' && file.size > 2 * 1014 * 1024) {
      return cb(new Error('File too large'))
    }
  }
})

router.use(express.json());
router.use('/uploads', express.static(appPath + '/uploads'))
router.use(express.static('public'));

const TYPE_ACCEPTED = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/svg+xml': 'svg',
  'application/pdf': 'pdf' /// pordzum ei
}

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
    mimetype: TYPE_ACCEPTED
  },
  storage: fileStorage
});

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Svg Test APP   ' });
});

router.post("/", (req, res, next) => {
  res.redirect('/register');
});

router.get('/register', (req, res, next) => {
  res.render('register', { errorMessage: null })
});

module.exports = router;
