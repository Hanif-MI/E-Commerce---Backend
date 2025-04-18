import { Sequelize } from "sequelize";
import * as fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

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

export default sequelize;
