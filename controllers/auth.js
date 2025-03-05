const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {

  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email })
    
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Email already in use'
      })
    }

    user = new User(req.body);
    
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
  
    await user.save();
    
    const token = await generateJWT(user.id, user.name);
    
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Failed to create user'
    })
  }

}

const loginUser = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email })
    
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Incorrect email or password'
      })
    }
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Wrong password'
      })
    }

    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Failed to login user'
    })
  }
}

const renewToken = async (req, res = response) => {

  const uid = req.uid;
  const name = req.name;

  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token
  })
}

module.exports = {
  createUser,
  loginUser,
  renewToken
}