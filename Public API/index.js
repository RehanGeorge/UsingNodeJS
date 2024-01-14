import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Hello" });
});

app.post("/get-joke", async (req, res) => {
  const response = await axios.get(
    "https://v2.jokeapi.dev/joke/Any?type=single"
  );
  res.render("index.ejs", { content: response.data.joke });
});

app.post("/sleep", (req, res) => {
  res.render("index.ejs", { content: "Well, okay then..." });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
