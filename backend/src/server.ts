import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userController from "./controllers/userController";
import machineController from "./controllers/machineController";
import trainingController from "./controllers/trainingController";
import statisticsController from "./controllers/statisticsController";
import adminController from "./controllers/adminController";
import { authMiddleware } from "./middlewares/jwtMiddleware";
import { adminMiddleware } from "./middlewares/adminMiddleware";

dotenv.config();

const app = express();

app.set('trust proxy', true);
console.log('NODE_ENV:', process.env.NODE_ENV);

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://schostore.synology.me:5600']  // your real frontend URL with port!
    : ['http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,   // important to allow sending JWT auth headers/cookies
}));

app.use(express.json());

app.use("/api/user", userController);
app.use("/api/machine", authMiddleware, machineController);
app.use("/api/training", authMiddleware, trainingController);
app.use("/api/statistics", authMiddleware, statisticsController);
app.use("/api/admin", authMiddleware, adminMiddleware, adminController);

app.use(express.static("public"));

app.get("**", (req: Request, res: Response) => {
    res.status(404).json({error: "Sorry, no endpoint here!"});
});



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`[Info] Server running behind reverse proxy on port ${PORT}`);
});

export default app