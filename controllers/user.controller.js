const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password)
        return res
          .status(400)
          .json({ msg: "Por favor llena todos los campos." });

      const userwithEmail = await User.findOne({ email });
      if (userwithEmail)
        return res.status(400).json({ msg: "El correo ingresado ya existe." });

      const userWithName = await User.findOne({ username });
      if (userWithName)
        return res.status(400).json({ msg: "El usuario ingresado ya existe." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "La contraseña debe tener mínimo 6 caracteres." });

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = {
        username,
        email,
        password: passwordHash,
      };

      await User(newUser).save();

      res.json({ msg: "!Usuario registrado!", created: true });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUser: async (req, res) => {
    const { userId } = req;

    try {
      if (userId) {
        const currentUser = await User.findById(userId).select("-password");
        return res.json({ user: currentUser });
      }
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  getUsers: async (req, res) => {
    try{
      const users = await User.find({})
      return res.json(users)

    }catch(err){
      return res.status(400).json({ msg: err.message });
    }

    

  },

  editUser: async (req, res) => {
    const { userId } = req.params;
    const newUser = req.body;

    try {
      const userFounded = await User.findByIdAndUpdate(userId, newUser); //TODO Falta editar la fotico.

      if (userFounded === null)
        return res
          .status(400)
          .json({ msg: "El usuario no está en la base de datos." });

      res.json({ msg: "Usuario actualizado correctamente" });
    } catch (error) {
      return res.status(400).json({ msg: err.message });
    }
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;
    const userFounded = await User.findByIdAndDelete(userId);
    if (userFounded === null)
      return res
        .status(400)
        .json({ msg: "El usuario no está en la base de datos." });

    res.json({ msg: "Usuario eliminado correctamente" });

    try {
    } catch (error) {}
  },
};

module.exports = userController;
