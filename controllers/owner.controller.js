const Owner = require("../models/Owner");
const jwt = require("jsonwebtoken");

const userController = {
  registerOwner: async (req, res) => {
    const { name, lastName, createdBy, document, phone, email, address } =
      req.body;
    const newOwner = {
      name,
      lastName,
      createdBy,
      document,
      phone,
      email,
      address,
    };

    const owner = new Owner(newOwner);

    await owner.save();

    res.json({ owner });
  },
};

module.exports = userController;
