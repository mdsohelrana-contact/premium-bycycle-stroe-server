import app from './app';
import config from './config/config';
import { connectDb } from './config/database';

const PORT = config.port || 3000;

const mainServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Example app listening on http://localhost:${PORT}`);
    });
    await connectDb();
  } catch (error) {
    console.log('error:', error);
  }
};

mainServer();
