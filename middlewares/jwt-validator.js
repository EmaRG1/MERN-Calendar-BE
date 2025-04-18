const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
  //x-token headers
  const token = req.header('x-token');
  
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No token in request'
    });
  }

  try {
    const {uid, name}= jwt.verify(
      token,
      process.env.SECRET_JW_SEED
    );

    req.uid = uid;
    req.name = name


  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid Token'
    })
  }
  
  next();
}

module.exports = {
  validateJWT
}