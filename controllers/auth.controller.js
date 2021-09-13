const bcrypt = require("bcrypt");
const Users = require("../models/User");
//const jwt = require("jsonwebtoken")
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/handleTokens");

const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if(!username || !password) return res.status(400).json({ msg: "Por favor llena todos los campos." });

      const user = await Users.findOne({ username });

      if (!user)
        return res
          .status(401)
          .json({
            msg: "Usuario o contraseña incorrecta.",
          });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ msg: "Usuario o contraseña incorrecta." });

      const access_token = createAccessToken({id: user.id});
      const refresh_token = createRefreshToken({id: user.id});

      res.json({ msg: "Login success!", r_t: refresh_token, a_t: access_token });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

 /*  refreshToken: (req, res)=>{
    const refreshToken = req.body.token
    if(!refreshToken || !refreshTokens.includes(refreshToken)){
      return res.json({message: "Token not found, login again."})
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,user)=>{
      if(!err){
        const accessToken = createAccessToken(user) //TODO pasar a JSON
        return res.json({success:true,accessToken})
      }else{
        return res.json({success:false,message:"Invalid refresh token."})
      }
    })
  } */
};

module.exports = authController;
