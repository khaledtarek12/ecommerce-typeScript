declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    PORT: number;
    DB_URL: string;
    BASE_URL: string;
    JWT_SECRET_KEY: string;
    JWT_EXPIRE_TIME: string;
  }
}
