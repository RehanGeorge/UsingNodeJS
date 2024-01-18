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
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET home page - TODO Implement function to checkVisited countries
app.get("/", async (req, res) => {
  res.render("index.ejs", { countries: countries, total: total });
});

// INSERT new country
app.post("/add", async (req, res) => {
  const country = req.body.country;
  const result = await db.query(
    "SELECT country_code FROM countries WHERE country_name = $1",
    [country]
  );

  if (result.rows.length !== 0) {
    const country_code = result.rows[0].country_code;

    await db.query("INSERT INTO visited_countries(country_code) VALUES ($1)", [
      country_code,
    ]);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
