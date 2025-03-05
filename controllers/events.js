const express = require('express');

const getAllEvents = (req, res) => {
  res.json({
    ok: true,
    msg: 'getAllEvents'
  })
}

const createEvent = (req, res) => {
  res.json({
    ok: true,
    msg: 'createEvent'
  })
}

const updateEvent = (req, res) => {
  res.json({
    ok: true,
    msg: 'updateEvent'
  })
}

const deleteEvent = (req, res) => {
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