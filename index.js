require("dotenv").config();
require("./config/DB.config");
require("./models/Pet")

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const authRouter = require("./routes/auth.routes")
const userRouter = require("./routes/user.routes")
const ownerRouter = require("./routes/owner.routes")
const petRouter = require("./routes/pet.routes")


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use("/api/auth", authRouter)
app.use("/api/users", userRouter); 
app.use("/api/owners", ownerRouter); 
app.use("/api/pets", petRouter); 


/* app.use(favicon(__dirname + '/build/favicon.ico')); */

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
