const express = require("express");
const impressionRouter = require("./routes/impression");
const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/impression", impressionRouter);

//Main Error Handler
app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknow error occurred!" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
