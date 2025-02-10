import app from "./app.js";
import config from "./app/config/index.js";
import mongoose from "mongoose";

async function main() {
  try {
    const conn = await mongoose.connect(config.mongodb_uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    app.listen(config.port, () => {
      console.log(`App is running on port: ${config.port}`);
    });
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
}

main();
