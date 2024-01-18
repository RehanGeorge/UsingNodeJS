import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: process.env.db_password,
  port: 5432,
});

db.connect();

let total = 0;
let countries = 0;

db.query("SELECT * FROM visited_countries", (err, res) => {
  if (err) {
    console.error(err);
  } else {
    countries = res.rows.map((row) => row.country_code);
    total = countries.length;
  }
  db.end();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index.ejs", { countries: countries, total: total });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
