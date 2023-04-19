const express = require("express");
const router = express.Router();
const Batch = require("../models/batch");

// Get all batches
router.get("/", async (req, res) => {
  try {
    const batches = await Batch.find();
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new batch
router.post("/", async (req, res) => {
  const { name } = req.body;

  const newBatch = new Batch({ name });

  try {
    const savedBatch = await newBatch.save();
    res.status(201).json(savedBatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a batch
router.put("/:id", async (req, res) => {
  const { name } = req.body;

  try {
    const updatedBatch = await Batch.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    res.status(200).json(updatedBatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a batch
router.delete("/:id", async (req, res) => {
  try {
    await Batch.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Batch deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
