const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const Degree = require("../models/degree");
const Faculty = require("../models/faculty");
const Batch = require("../models/batch");

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get events filtered by degree, faculty, and batch
router.get("/filter", async (req, res) => {
  const { degreeName, facultyName, batchName } = req.query;

  try {
    const filter = {};
    if (degreeName) filter.degree = degreeName;
    if (facultyName) filter.faculty = facultyName;
    if (batchName) filter.batch = batchName;

    const events = await Event.find(filter);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new event
router.post("/", async (req, res) => {
  const { name, date, degreeName, facultyName, batchName } = req.body;

  try {
    const degree = await Degree.findOne({ name: degreeName });
    const faculty = await Faculty.findOne({ name: facultyName });
    const batch = await Batch.findOne({ name: batchName });

    if (!degree || !faculty || !batch) {
      return res
        .status(400)
        .json({ message: "Invalid degree, faculty, or batch name provided" });
    }

    const newEvent = new Event({
      name,
      date,
      degree: degree.name,
      faculty: faculty.name,
      batch: batch.name,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an event
router.put("/:id", async (req, res) => {
  const { name, date, degreeName, facultyName, batchName } = req.body;

  try {
    const degree = degreeName
      ? await Degree.findOne({ name: degreeName })
      : null;
    const faculty = facultyName
      ? await Faculty.findOne({ name: facultyName })
      : null;
    const batch = batchName ? await Batch.findOne({ name: batchName }) : null;

    const updateData = { name, date };
    if (degree) updateData.degree = degree.name;
    if (faculty) updateData.faculty = faculty.name;
    if (batch) updateData.batch = batch.name;

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an event
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
