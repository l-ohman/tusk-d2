const express = require("express");
const path = require("path");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static
// app.use(express.static("../public"));
app.use(express.static(path.join(__dirname, '../public')))

app.get("/", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  } catch (error) {
    next(error);
  }
})

// API routes
app.use("/api", require("./api"));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

// Specified because Heroku needs to listen on a specific port
let port = 8000 //process.env.PORT ? process.env.PORT : 8000;
app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = app;
