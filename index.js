require("dotenv").config();
require("./config/DB.config");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const authRouter = require("./routes/auth.routes")
const usersRouter = require("./routes/users.routes")
/* const userRouter = require("./routes/user.routes"); */

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter); 
//app.use(favicon(__dirname + '/build/favicon.ico'));

/* app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
}); */



const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
