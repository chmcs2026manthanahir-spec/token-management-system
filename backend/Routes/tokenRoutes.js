import express from "express";
import Token from "../models/Token.js";

const router = express.Router();

/* CREATE TOKEN */
router.post("/", async (req, res) => {
  try {
    const token = await Token.create(req.body);
    res.status(201).json(token);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* GET ALL TOKENS */
router.get("/", async (req, res) => {
  try {
    const tokens = await Token.find().sort({ issuedAt: 1 });
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* GET SINGLE TOKEN */
router.get("/:id", async (req, res) => {
  try {
    const token = await Token.findById(req.params.id);
    if (!token) return res.status(404).json({ message: "Token not found" });
    res.json(token);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* UPDATE TOKEN */
router.put("/:id", async (req, res) => {
  try {
    const token = await Token.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(token);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* DELETE TOKEN */
router.delete("/:id", async (req, res) => {
  try {
    await Token.findByIdAndDelete(req.params.id);
    res.json({ message: "Token deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
