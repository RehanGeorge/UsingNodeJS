import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const fName = req.body["fName"];
  const lName = req.body["lName"];
  const numberOfLetters = fName.length + lName.length;
  res.render("index.ejs", { numberOfLetters: numberOfLetters });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
