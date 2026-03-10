import asyncHandler from "express-async-handler";
import Token from "../models/Token.js";


const generateToken = asyncHandler(async (req, res) => {
  const {
    customerName,
    serviceType,
    priorityLevel,
    contactNumber,
    remarks
  } = req.body;

  if (!customerName || !serviceType) {
    res.status(400);
    throw new Error("Customer name and service type are required");
  }

  const lastToken = await Token.findOne().sort({ tokenNumber: -1 });
  const tokenNumber = lastToken ? lastToken.tokenNumber + 1 : 1;

  const token = await Token.create({
    tokenNumber,
    customerName,
    serviceType,
    priorityLevel,
    contactNumber,
    remarks,
    status: "Waiting"
  });

  res.status(201).json(token);
});

const getTokens = asyncHandler(async (req, res) => {
  const tokens = await Token.find().sort({
    priorityLevel: -1,
    tokenNumber: 1
  });

  res.json(tokens);
});


const serveNextToken = asyncHandler(async (req, res) => {
  const { counterNumber } = req.body;

  const token = await Token.findOneAndUpdate(
    { status: "Waiting" },
    {
      status: "In-Progress",
      counterNumber
    },
    { new: true }
  );

  if (!token) {
    res.status(404);
    throw new Error("No waiting tokens available");
  }

  res.json(token);
});


const completeToken = asyncHandler(async (req, res) => {
  const token = await Token.findById(req.params.id);

  if (!token) {
    res.status(404);
    throw new Error("Token not found");
  }

  token.status = "Completed";
  await token.save();

  res.json(token);
});

export {
  generateToken,
  getTokens,
  serveNextToken,
  completeToken
};
