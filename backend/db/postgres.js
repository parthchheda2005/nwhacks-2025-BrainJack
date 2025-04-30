const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: process.env.POSTGRES_PASSWORD,
  database: "nw-hacks-25",
});

client
  .connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("PostgreSQL connection error:", err));

module.exports = client;
