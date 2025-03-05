const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {validateFields} = require('../middlewares/field-validators')
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/jwt-validator');

router.post(
  '/new',
  [//middlewares
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must have 6 characters').isLength({ min: 6 }),
    validateFields
  ],
  createUser
)

router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must have 6 characters').isLength({ min: 6 }),
    validateFields
  ],
  loginUser
)

router.get('/renew', validateJWT, renewToken)


module.exports = router;