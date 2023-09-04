import { DataSourceOptions } from "typeorm";
import ENV from "../env";

const env = ENV.Application.NODE_ENV;
const basePath = env === "DEVELOPMENT" ? "src" : "dist";

const config: DataSourceOptions = {
  type: "postgres",
  url: ENV.Database.DATABASE_URL,
  synchronize: false,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: [`${basePath}/database/migrations/**/*`],
  entities: [`${basePath}/database/entities/**/*`],
};

export default config;
