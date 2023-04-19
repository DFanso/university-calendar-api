const express = require("express");
const router = express.Router();
const Degree = require("../models/degree");

// Get all degrees
router.get("/", async (req, res) => {
  try {
    const degrees = await Degree.find();
    res.status(200).json(degrees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new degree
router.post("/", async (req, res) => {
  const { name } = req.body;

  const newDegree = new Degree({ name });

  try {
    const savedDegree = await newDegree.save();
    res.status(201).json(savedDegree);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a degree
router.put("/:id", async (req, res) => {
  const { name } = req.body;

  try {
    const updatedDegree = await Degree.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.status(200).json(updatedDegree);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a degree
router.delete("/:id", async (req, res) => {
  try {
    await Degree.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Degree deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
