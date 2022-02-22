const port = 3000;
const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Navigate to the URL http://127.0.0.1:${port}/ for dev server!`);
});
