import mongoose from 'mongoose';
import config from './config';
import app from './app';

import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();

process.on('unhandledRejection', () => {
  // console.error('Unhandled Rejection is detected,shuting down...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});


process.on('uncaughtException',()=>{
  process.exit(1)
})