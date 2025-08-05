import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userController from "./controllers/GymTracker/userController";
import machineController from "./controllers/GymTracker/machineController";
import trainingController from "./controllers/GymTracker/trainingController";
import statisticsController from "./controllers/GymTracker/statisticsController";
import adminController from "./controllers/GymTracker/adminController";
import { authMiddleware } from "./middlewares/jwtMiddleware";
import { adminMiddleware } from "./middlewares/adminMiddleware";
import guestController from "./controllers/PietsBar/guestController";

dotenv.config();

const app = express();

app.set('trust proxy', true);
console.log('NODE_ENV:', process.env.NODE_ENV);

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://schostore.synology.me:5600', 'https://schostore.synology.me:5601']  // your real frontend URL with port!
    : ['http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,   // important to allow sending JWT auth headers/cookies
}));

app.use(express.json());

// --------- GymTracker --------- 
app.use("/api/user", userController);
app.use("/api/machine", authMiddleware, machineController);
app.use("/api/training", authMiddleware, trainingController);
app.use("/api/statistics", authMiddleware, statisticsController);
app.use("/api/admin", authMiddleware, adminMiddleware, adminController);
// --------- GymTracker --------- 

// --------- Piets --------- 
app.use("/api/piets", guestController);
// --------- Piets --------- 

app.use(express.static("public"));

app.get("**", (req: Request, res: Response) => {
    res.status(404).json({error: "Sorry, no endpoint here!"});
});



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`[Info] Server running behind reverse proxy on port ${PORT}`);
});

export default app