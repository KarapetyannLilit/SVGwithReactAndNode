var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path')
const bcrypt = require('bcrypt');
const db = require('../models')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid')
const sharp = require('sharp');
const appPath = require('../constants');
const xmldom = require('xmldom');
const cheerio = require('cheerio');

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

router.get('/svg', (req, res) => {
  const files = fs.readdirSync("./public/copySVG")
  const dates = {}
  for (const file of files) {
    const stat = fs.lstatSync(path.join("./public/copySVG", file))
    dates[stat.mtime] = file
  }
  const lastEdititedDAte = new Date(
    Math.max(
      ...Object.keys(dates).map(element => {
        return new Date(element);
      }),
    ),
  )

  Object.keys(dates).map(mtime => {
    const dateinDates = new Date(mtime)
    if (dateinDates.toDateString() === lastEdititedDAte.toDateString()) {
      res.sendFile(path.resolve("./public/copySVG", dates[mtime]))
      return
    }
  })
})

router.get('/uploadfile', upload.single('file'), (req, res, next) => {
  res.render('uploadfile', { errorMessage: null, accepted_types: Object.keys(upload.limits.mimetype).toString() })
});

router.post("/uploadfile", upload.single('file'), async (req, res, next) => {
  if (req.file.mimetype === "image/svg+xml") {
    fs.readFile(req.file.path, { encoding: 'utf-8' }, (err, data) => {
      if (!err) {
        const svgHTML = new xmldom.DOMParser().parseFromString(data, "image/svg+xml");
        const svgList = svgHTML.getElementsByTagName('svg');
        if (!svgList) {
          console.log("error not found");
        }
        const svg = svgList.item(0);
        svg.setAttribute('width', '300px');;
        let num = 0
        const serializer = new xmldom.XMLSerializer();
        const serialized = serializer.serializeToString(svgHTML)
        const $ = cheerio.load(serialized, null, false)

        const addClassName = (node) => {
          if (!(node.name === "defs" || node.name === "style")) {
            if (node.attribs) {
              if (!node.attribs.class) {
                node.attribs.class = `changable-color-${num}`
                if (node.attribs.fill) {
                  const fill = node.attribs.fill
                  if (fill.includes("url")) {
                    const url = fill.replace("url(", "").replace(")", "")
                    $(`${url}`)[0].children.map(child => {
                      if (child.attribs) {
                        child.attribs.class += ` ${child.attribs.id}`
                      }
                    })
                  }
                }
                if (node.attribs.stroke) {
                  const stroke = node.attribs.stroke
                  if (stroke.includes("url")) {
                    const url = stroke.replace("url(", "").replace(")", "")
                    $(`${url}`)[0].children.map(child => {
                      child.attribs.class += ` ${child.attribs.id}`
                    })
                  }
                }
                num++
              }
              else if (node.attribs.class) {
                node.attribs.class += ` changable-color-${num}`
                $('style').text().includes(node.attribs.class)
                num++
              }
            }
          }
        }

        const findEachChild = (node) => {
          if (node) {
            const children = node.children
            if (children && children.length) {
              children.forEach((child) => {
                findEachChild(child)
              })
            }
            else {
              addClassName(node)
            }
          }
        }
        findEachChild($('svg')[0])
        console.log($.html());

        fs.promises.writeFile(`public/copySVG/copySVG${req.file.originalname}`, $.html())
          .then(() => {
            console.log('The file has been saved!');
            res.redirect('/')
          }).catch(error => {
            console.log(error)
          });
      } else {
        console.log("err");
      }
    });

  }
  else {
    sharp(req.file.path)
      .resize({
        width: 150,
        height: 97
      })
      .toFile(`./resizedCopies/copyResized${req.file.originalname}`)
      .then(function (info) {
        console.log(info)
      })
      .catch(function (err) {
        console.log(err)
      })
  }
});

module.exports = router;
