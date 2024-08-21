import 'dotenv/config';
export const development: boolean = true;

export const appSettings = {
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    expiresInRefresh: process.env.JWT_EXPIRES_IN_REFRESH,
  },
  mongoose: {
    dbConn: process.env.MONGO_URL,
    dbName: process.env.DB_NAME,
    isReplicaSet: process.env.IS_REPLICA_SET === 'true' ? true : false,
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME,
  },
  do_endpoint: process.env.DO_ENDPOINT,
  do_access_key: process.env.DO_ACCESS_KEY,
  do_secret_key: process.env.DO_SECRECT_KEY,
  do_bucket: process.env.DO_BUCKET,

  email_account: process.env.EMAIL_ACCOUNT,
  email_from: process.env.EMAIL_FROM,

  timeZone: process.env.TIME_ZONE,
  appName: process.env.APP_NAME,
};
