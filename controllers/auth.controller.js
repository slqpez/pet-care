const bcrypt = require('bcrypt')
const Users = require("../models/User")
const {createAccessToken, createRefreshToken} = require("../utils/handleTokens")

const authController = {

  login: async (req, res)=>{
    try {
        const {username, password} = req.body
        const user = await Users.findOne({username})
        if(!user) return res.status(400).json({msg: "El usuario ingresado no está en nuestra base de datos."})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({msg:"La contraseña es incorrecta."})

        

        const refresh_token = createRefreshToken({id: user._id})

        res.json({msg:"Login success!", rf_token:refresh_token})
        



    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
},


}

module.exports  = authController