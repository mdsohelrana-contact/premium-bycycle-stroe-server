import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASEURL,
  nodeEnv: process.env.NODE_ENV,
  saltRound: process.env.SALT_ROUND,
  jwtAccessToken: process.env.JWT_ACCESS_TOKEN,
  expaireIn: process.env.EXPAIREIN,
};
