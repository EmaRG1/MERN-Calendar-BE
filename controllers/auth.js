const { response } = require('express');
const User = require('../models/UserModel');

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
  
     await user.save();
    
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name
    })
  } catch (error) {
    
  }

}

const loginUser = (req, res = response) => {

  const { email, password } = req.body
  
  res.json({
    ok: true,
    msg: 'login',
    email,
    password
  })
}

const renewToken = (req, res = response) => {

  res.json({
    ok: true,
    msg: 'renew'
  })
}

module.exports = {
  createUser,
  loginUser,
  renewToken
}