import app from "./app.js";
import dotenv from "dotenv";
import { connectDatabase } from "./database/database.js";

//dotenv
dotenv.config({ path: "./config/config.env" });

//database
connectDatabase()
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`Server is runing on port : ${process.env.PORt}`);
    })
  )
  .catch((error) => {
    console.log("mongodb connection failed !!! ", error);
  });
