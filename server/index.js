const express = require("express");
const path = require("path");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  res.status(err.status || 500).send(err.message || "Internal server error");
});

app.listen(port = 8000, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = app;
