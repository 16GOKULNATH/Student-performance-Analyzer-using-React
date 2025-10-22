import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import studentRoutes from "./routes/studentRoutes.js";
import smsRoutes from "./controllers/smsController.js";
app.use("/api", smsRoutes);


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/students", studentRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
