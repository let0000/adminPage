const express = require("express");
const app = express();
const port = 5000;
const cookieParser = require("cookie-parser");

const config = require("./config/key");

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/admins", require("./routes/admin"));
app.use("/api/users", require("./routes/users"));
app.use("/api/counselors", require("./routes/counselors"));
app.use("/api/coupons", require("./routes/coupons"));
app.use("/api/events", require("./routes/events"));
app.use("/api/questions", require("./routes/questions"));

app.listen(port, () => console.log(`Starting app listening on port ${port}!`));
