const Owner = require("../models/Owner");
const Pet = require("../models/Pet");
const jwt = require("jsonwebtoken");

const ownerController = {
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

    try {
      const owner = new Owner(newOwner);

      await owner.save();

      return res.json(owner);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  getOwners: async (req, res) => {
    try {
      const owners = await Owner.find({}, {}).populate("pets");
      return res.json(owners);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  getOwnerById: async (req, res) => {
    const { ownerId } = req.params;

    try {
      const owner = await Owner.findById(ownerId);
      return res.status(200).json(owner);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  updateOwner: async (req, res) => {
    const { ownerId } = req.params;
    const newOwner = req.body;

    try {
      const owner = await Owner.findByIdAndUpdate(ownerId, newOwner);

      if (owner === null) {
        return res
          .status(400)
          .json({ message: "El propietario no está en la base de datos." });
      } else {
        return res.json({
          message: "El usuario fue actualizado correctamente.",
        });
      }
    } catch (err) {
      return res.status(400).json({ message: error.message });
    }
  },

  deleteOwner: async (req, res) => {
    const { ownerId } = req.params;

    try {
      const owner = await Owner.findById(ownerId);
      if(owner === null)       return res.status(400).json({ message: "El propietario no está en la base de datos." });

      const pets = owner.pets;

      const petsArray = pets.map((pet) => pet.toString());

      for (pet of petsArray) {
        const petFounded = await Pet.findById(pet);
        const newOwners = petFounded.owners.filter((owner) => owner != ownerId);
        console.log(newOwners)

        if (newOwners.length === 0)
          return res.json({
            message: "La mascota no puede quedarse sin dueños.",
          });

        petFounded.owners = newOwners;
        await petFounded.save();
      }

      await Owner.findByIdAndDelete(ownerId);
      res.json({ message: "El usuario fue eliminado correctamente." });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};

module.exports = ownerController;
