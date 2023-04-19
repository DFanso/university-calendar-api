const express = require("express");
const router = express.Router();
const Faculty = require("../models/faculty");

// Get all faculties
router.get("/", async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new faculty
router.post("/", async (req, res) => {
  const { name } = req.body;

  const newFaculty = new Faculty({ name });

  try {
    const savedFaculty = await newFaculty.save();
    res.status(201).json(savedFaculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a faculty
router.put("/:id", async (req, res) => {
  const { name } = req.body;

  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.status(200).json(updatedFaculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a faculty
router.delete("/:id", async (req, res) => {
  try {
    await Faculty.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
