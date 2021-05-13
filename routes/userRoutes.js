// importing the express library but destructuring just the Router logic
const { Router } = require("express");

// create a new router
const router = new Router();

// require bcrypt for hashing the password
const bcrypt = require("bcrypt");

// import middleware
const verifyToken = require("../middlewares/verifyToken");

// import utils
const generateToken = require("../utils/generateToken");

// import model schema
const User = require("../models/userModels");

// user/register
router.post("/register", async (req, res) => {
  try {
    await User.init();

    // check if the user exists 
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).send('Um usuário com este email já existe.');

    // hash the password with 10 rounds
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // hashed password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create user
    user = await User.create({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });

    // generate jwt token with user.id
    let token = generateToken(user.id);

    return res.status(200).send({ auth: true, token: token })
  } catch (err) {
    if (err.code == 11000 && err.keyPattern.email == 1)
      res.status(500).send('E-mail duplicado');
    else
      res.status(500).send('Internal Server Error');
  }
});

// user/login 
router.post('/login', async function (req, res) {
  try {
    // check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send('Invalid Credentials');

    // check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ auth: false, token: null, msg: 'Invalid Credentials' });

    // generate jwt token with user.id
    let token = generateToken(user.id);

    return res.status(200).send({ auth: true, token: token })
  } catch (err) {
      res.status(500).send('Internal Server Error');
  }
});


// user/isAuthorized
router.get('/isAuthorized', verifyToken, async function (req, res) {
  try {
    const user = await User.findById(req.userId, { password: 0 }); // return user without password
    if (!user) return res.status(404).send("Nenhum user encontrado.");
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Ocorreu um problema ao localizar o user.");
  }
});

// export the router function
module.exports = router;