import { DataSourceOptions } from "typeorm";
import ENV from "../env";

const env = ENV.Application.NODE_ENV;

const configProduction: DataSourceOptions = {
  type: "postgres",
  url: ENV.Database.DATABASE_URL,
  synchronize: false,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: ["./migrations/*.js"],
  entities: ["./entities/*.entity.js"],
};

const configDevelopment: DataSourceOptions = {
  type: "postgres",
  url: ENV.Database.DATABASE_URL,
  synchronize: false,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: ["src/database/migrations/**/*"],
  entities: ["src/database/entities/**/*"],
};

export default env === "PRODUCTION" ? configProduction : configDevelopment;
