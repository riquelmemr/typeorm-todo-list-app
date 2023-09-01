import "dotenv/config";

const ENV = {
  Application: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT
  },
  Database: {
    DATABASE_URL: process.env.DATABASE_URL
  }
}

export default ENV;