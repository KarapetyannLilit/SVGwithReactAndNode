var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path')
const bcrypt = require('bcrypt');

router.use(express.json());

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
  const text = JSON.stringify({
    name: name,
    email: email,
    password: hashedPassword
  })

  const stats = fs.statSync(path.resolve("data.json"));
  const fileSizeInBytes = stats.size;

  if (!(fileSizeInBytes)) {
    fs.promises.appendFile(path.resolve("data.json"), "[" + text + "]").then(() => {
      res.redirect(200, '/login');
    }).catch(error => {
      console.log(error)
    });
  } else {
    const fromFile = fs.readFileSync(path.resolve("data.json"), 'utf8');
    const parsed = JSON.parse(fromFile)
    const newUser = {
      name: name,
      email: email,
      password: hashedPassword
    }
    parsed.push(newUser)
    const stringData = JSON.stringify(parsed)
    fs.promises.writeFile(path.resolve("data.json"), stringData).then(() => {
      console.log('The file has been saved!');
      res.redirect('/login');
    }).catch(error => {
      console.log(error)
    });
  }
});

router.get('/login', (req, res, next) => {
  res.render('login')
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  fs.promises.readFile(path.resolve("data.json"), "utf8").then((users) => {
    // const filterdWithEmail = JSON.parse(users).filter(word => word.email === email);
    // const aauthenticatedUser = filterdWithEmail.filter((user) => bcrypt.compareSync(password, user.password) === true)
    const authenticatedUser = JSON.parse(users).filter(word => word.email === email).filter((user) => bcrypt.compareSync(password, user.password) === true)
    if (authenticatedUser.length !=0){
      console.log("Password matches!")
      res.status(200).json({ msg: "Login success" })
      return
    }else{
      console.log("Password doesn't match!")
      res.status(401).json({ msg: "Invalid credencial" })
     return
    }
  }).catch(error => {
    res.status(401).json({ error: "User does not exist" });
    console.log(error)
  });;
});
module.exports = router;






// let form = [
//   { name: "Joe", email: "joe.black.mail.com", password: "11111111" }
// ];

// router.get('/register', (req, res, next) => {
//   fs.promises.readFile(path.resolve("data.json", "utf8")).then((form) => {
//     res.send(form)
//   });
// });

      //  console.log( JSON.parse('['+users.substring(0, users.length-1)+']'))


// const App = () => {
//   fetch("/register").then((resp) => resp.json()).then((resp) => {
//     form = resp
//     render()
//   })
//   const sendtoServer = () => {
//     fetch("/register", {
//       method: "post",
//       headers: {
//         "content-type": "application/json"
//       },
//       body: JSON.stringify(form)
//     })

//   }
// }

// else {
  //   const fromFile = fs.readFileSync('data.json', 'utf8')
  //   const file = fromFile.slice(0, fromFile.length - 2)
  //   console.log(file);
  //   fs.write(path.resolve("data.json"),fileSizeInBytes-1,)
  //   fs.promises.appendFile(path.resolve("data.json"),   "," + text + "]").then(() => {
  //     console.log( '\r' + "," + text + "]");
  //     res.redirect(200, '/login');
  //   }).catch(error => {
  //     console.log(error)
  //   });
  // }


   // fs.promises.readFile(path.resolve("data.json"), "utf8").then((users) => {
    //   users.map(user => {
    //     if (user) {
    //       if (user.email === email) {
    //         const validPassword = bcrypt.compare(password, user.password);
    //         if (validPassword) {
    //           return res.status(200).json({ msg: "Login success" })
    //         } else {
    //           return res.status(401).json({ msg: "Invalid credencial" })
    //         }
    //       }
    //       else {
    //         res.status(401).json({ error: "User does not exist" });
    //       }
    //     }
    //   })
    // });


    
          // const validPassword = bcrypt.compare(password, user.password);
          // console.log(bcrypt.compare(password, user.password));
          // if (validPassword) {
          //   console.log(validPassword);
          //   return res.status(200).json({ msg: "Login success" })
          // } else {
          //   return res.status(401).json({ msg: "Invalid credencial" })
          // }