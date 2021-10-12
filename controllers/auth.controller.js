const bcrypt = require("bcrypt");
const Users = require("../models/User");

const Owners = require("../models/Owner");
const nodemailer = require("nodemailer")
//const jwt = require("jsonwebtoken")
const {
  createAccessToken,
  createRefreshToken,
  createClientToken
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

  clientEmailAccess: async (req, res) => {

  
    const {clientEmail} = req.body

    console.log(clientEmail)

    const owner = await Owners.findOne({email:clientEmail });
    console.log(owner)

    const access_token = createAccessToken({id: owner._id});

    if(owner){
      try{
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, 
          auth: {
            user: "santiago.lopez16@udea.edu.co",
            pass: "zlrfnplvxljxzeuh"
          },
        });
    
        transporter.verify().then(() => {
          console.log("Works")
        })
    
         await transporter.sendMail({
          from: '"Petcare 🐶" <santiago.lopez16@udea.edu.co>', 
          to: clientEmail, 
          subject: "Petcare 🐶", 
          text: "Petcare email access", 
          html: `<a href= http://localhost:3000/clientpage/${access_token}>Ingresa en este enlace </a>`,
        });
  
        res.json({msg: "Correo enviado"})
    
      }catch(err){
        res.json({error: err})
      }
    }else{
      res.json({msg: "No hay propietarios con ese correo."})
    }

   
    
  }

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
