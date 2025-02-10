import app from "./app.js";
import config from "./app/config/index.js";
import mongoose from "mongoose";

async function main() {
  const port = config.port || 5000;


  try {
    const conn = await mongoose.connect("mongodb+srv://bookbin:RuF61AUT50wyGZ7w@cluster0.b2w59kw.mongodb.net/bookbin?retryWrites=true&w=majority&appName=Cluster0");
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
