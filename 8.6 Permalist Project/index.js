import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: process.env.dbPassword,
  port: 5432,
});

db.connect();

async function getItems() {
  const result = await db.query("SELECT * FROM items ORDER BY id ASC");
  return result.rows;
}

/*
let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];
*/

app.get("/", async (req, res) => {
  try {
    const items = await getItems();
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;
  db.query("UPDATE items SET title = $1 WHERE id = $2", [item, id]);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const item = req.body.deleteItemId;
  await db.query("DELETE FROM items WHERE id = $1", [item]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
