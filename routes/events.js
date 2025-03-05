const express = require('express');
const router = express.Router();
const { validateJWT } = require("../middlewares/jwt-validator");
const { getAllEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

router.use(validateJWT);

router.get('/', getAllEvents);

router.post('/', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);


module.exports = router;