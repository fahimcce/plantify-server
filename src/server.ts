import mongoose from "mongoose";

import { Server } from "http";
import config from "./app/config";
import app from "./app";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// Handle unhandledRejection for asyncronus
process.on("unhandledRejection", () => {
  console.log(`UnhandledRejection is Detected, Shut Down the Server..`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Handle uncaughtException for Synchronus
process.on("uncaughtException", () => {
  console.log(`uncaughtException is Detected, Shut Down the Server..`);
  process.exit(1);
});
