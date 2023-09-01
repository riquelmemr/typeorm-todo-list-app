import { DataSourceOptions } from "typeorm";

const env = process.env.NODE_ENV;

const configProduction: DataSourceOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
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
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: ["src/database/migrations/**/*"],
	entities: ["src/database/entities/**/*"],
}

export default (env === "PRODUCTION" ? configProduction : configDevelopment);