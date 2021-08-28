const bcrypt = require("bcrypt");
const Users = require("../models/User");
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
          .status(400)
          .json({
            msg: "Usuario o contraseña incorrecta.",
          });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Usuario o contraseña incorrecta." });

      const refresh_token = createAccessToken({ id: user._id });

      res.json({ msg: "Login success!", rf_token: refresh_token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = authController;
