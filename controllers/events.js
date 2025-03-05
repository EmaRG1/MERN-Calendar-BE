const {response} = require('express');
const Event = require('../models/EventModel')

const getAllEvents = async (req, res = response) => {

  try {
    const allEvents = await Event.find({}).populate('user','name')
    res.json({
      ok: true,
      allEvents
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Failed to retrieve events'
    })
  }
}

const createEvent = async (req, res = response) => {
  
  const newEvent = new Event(req.body)

  try {

    newEvent.user = req.uid

    const eventDB = await newEvent.save()

    res.status(201).json({
      ok: true,
      eventDB
    })

  } catch (error) {

    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Failed to create event'
    })

  }
  
}

const updateEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'updateEvent'
  })
}

const deleteEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'deleteEvent'
  })
}

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent
}