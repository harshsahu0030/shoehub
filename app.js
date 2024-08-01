import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

//middlewars
app.use(
  cors({
    // orgin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.static("public"));

//routes import
import userRoute from "./routes/userRoute.js";

//routes
app.use("/api/v1", userRoute);

//connecting to frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

export default app;
