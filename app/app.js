const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const authRouter = require("./routes/AuthRouter");
const adminRouter = require("./routes/AdminRouter");
const userAccountRouter = require("./routes/UserAccountRouter");
const schoolRouter = require('./routes/SchoolRouter');
const courseRouter = require('./routes/CourseRouter');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use('/admin', adminRouter);
app.use("/user",userAccountRouter);
app.use("/school",schoolRouter);
app.use("/courses",courseRouter);

app.listen(3000, () => {
    console.log("Server is running at port 3000");
  });