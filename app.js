import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import middleware from "./middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();

cloudinary.config({
  cloud_name: "deloi6s5p",
  api_key: "412422891469958",
  api_secret: "eWRjI-sjtYVXtjPAWCg5PboW2Zg", // Click 'View API Keys' above to copy your API secret
});

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
import productRoute from "./routes/productRoute.js";

//routes
app.use("/api/v1", userRoute);
app.use("/api/v1", productRoute);

//connecting to frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.use("*", (_, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

//error middleware
app.use(middleware);

export default app;
