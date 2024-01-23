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

const books = await db.query("SELECT * FROM book");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { books: books.rows });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
