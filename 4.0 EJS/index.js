import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const todayDay = new Date().getDay();
  let message = "";

  if (todayDay === 0 || todayDay === 6) {
    message = "Hey! It's the weekend, it's time to have fun!";
  } else {
    message = "Hey! It's a weekday, it's time to work hard!";
  }

  res.render("index.ejs", { message: message });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
