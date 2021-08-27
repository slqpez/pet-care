const Users = require("../models/User")
const bcrypt = require('bcrypt')

const userController ={

  registerUser: async (req, res)=>{

    try{
        const {username, email, password} = req.body
        
        if(!username || !email || !password)
        return res.status(400).json({msg:"Por favor llena todos los campos."})
        
        const userwithEmail = await Users.findOne({email})
        if(userwithEmail) return res.status(400).json({msg:"El correo ingresado ya existe."})

        const userWithName = await Users.findOne({username})
        if(userWithName) return res.status(400).json({msg:"El usuario ingresado ya existe."})

        if(password.length < 6)
        return res.status(400).json({msg:"La contraseña debe tener mínimo 6 caracteres"})

        const passwordHash = await bcrypt.hash(password, 10)
        
        const newUser = {
            username, email, password: passwordHash
        }

        await Users(newUser).save()
       
       
        res.json({msg:"!Usuario registrado!"})

    }catch(err){
        return res.status(500).json({msg:err.message})
    }
},
}

module.exports = userController