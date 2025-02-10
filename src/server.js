import app from "./app.js";
import config from "./app/config/index.js";
import mongoose from "mongoose";

async function main() {
  const port = config.port || 5000;
  try {
    const conn = await mongoose.connect(config.mongodb_uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    app.listen(port, () => {
      console.log(`App is running on port: ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
}

main();
