import dotenv from "dotenv";
import { Dialect } from "sequelize";

interface DbConfig {
  username: string | undefined;
  password: string | undefined;
  database: string | undefined;
  host: string | undefined;
  dialect: Dialect;
  logging?: boolean;
}

interface Config {
  development: DbConfig;
  staging: DbConfig;
  pre_prod: DbConfig;
  test: DbConfig;
  production: DbConfig;
}

dotenv.config();

// if (dotenv.error) {
//   throw dotenv.error;
// }

const config: Config = {
  development: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST_NAME,
    logging: false,
    dialect: "mysql",
  },
  staging: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST_NAME,
    dialect: "mysql",
  },
  pre_prod: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST_NAME,
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST_NAME,
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST_NAME,
    dialect: "mysql",
  },
};

const useSSL = process.env.TIDB_ENABLE_SSL === "true";

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "mysql",
  dialectOptions: useSSL
    ? {
        ssl: {
          ca: fs.readFileSync(process.env.CA_PATH!, "utf8"),
        },
      }
    : {},
  logging: false,
});

export default config;
