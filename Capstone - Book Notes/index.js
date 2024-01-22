import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "booknotes",
  password: process.env.dbPassword,
  port: 5432,
});

db.connect();

const test = await db.query("SELECT * FROM book");
console.log(test.rows);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
