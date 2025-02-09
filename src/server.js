const app = require("./app");
const config = require("./app/config");
const mongoose = require("mongoose");

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
