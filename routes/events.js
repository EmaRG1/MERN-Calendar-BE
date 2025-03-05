const express = require('express');
const router = express.Router();
const { validateJWT } = require("../middlewares/jwt-validator");
const { getAllEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validators');
const { isDate } = require('../helpers/isDate');

router.use(validateJWT);

router.get('/', getAllEvents);

router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end','End date is required').custom(isDate),
    validateFields
  ],
  createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);


module.exports = router;