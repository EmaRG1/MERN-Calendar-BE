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

const updateEvent = async(req, res = response) => {

  const eventID = req.params.id
  const uid = req.uid

  try {
    
    const eventToUpdate = await Event.findById(eventID)
    if (!eventToUpdate) {
      return res.status(404).json({
        ok: false,
        msg: 'Event not found'
      })
    }

    if (eventToUpdate.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Bad Request'
      })
    }

    const newEventData = {
      ...req.body,
      user: uid
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventID, newEventData,{returnDocument: 'after'})
    
    res.json({
      ok: true,
      updatedEvent
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Failed to update event'
    })
  }
}

const deleteEvent = async (req, res = response) => {
  
  const eventID = req.params.id
  const uid = req.uid

  try {

    const eventToDelete = await Event.findById(eventID)
    if (!eventToDelete) {
      return res.status(404).json({
        ok: false,
        msg: 'Event not found'
      })
    }

    if (eventToDelete.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'Failed to delete event'
      })
    }

    await Event.deleteOne(eventToDelete)

    res.json({
      ok: true,
      msg: 'Event deleted succesfully'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Failed to delete event'
    })
  }
}

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent
}