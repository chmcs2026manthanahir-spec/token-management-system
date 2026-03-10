import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import tokenRoutes from "./Routes/tokenRoutes.js";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"])

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  //origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.use("/tokens", tokenRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`http://localhost:${PORT}/tokens`);
});
