import { app } from './app.js';
import { config } from './config.js';

const server = app.listen(config.port, () => {
  console.log(`Vitto API running on port ${config.port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${config.port} is already in use. Stop the other server or set PORT to a different value in backend/.env.`);
    process.exit(1);
  }

  console.error(error);
  process.exit(1);
});
