const Owner = require("../models/Owner");
const Pet = require("../models/Pet");

const petController = {
  registerPet: async (req, res) => {
    const { name, breed, size, age, vaccination, cares, owners } = req.body;
    const newPet = {
      name,
      breed,
      size,
      age,
      vaccination,
      cares,
      owners,
    };

    try {
      const pet = new Pet(newPet);

      await pet.save();
      const ownersArray = owners.map((owner) => owner.toString());

      for (ownerId of ownersArray) {
        const ownerFounded = await Owner.findById(ownerId);
        ownerFounded.pets = ownerFounded.pets.concat(pet._id);
        await ownerFounded.save();
      }

      return res.json(pet);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  getPets: async (req, res) => {
    try {
      const pets = await Pet.find({}).populate("owners");
      return res.json(pets);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  getPetById: async (req, res) => {
    const { petId } = req.params;

    try {
      const pet = await Pet.findById(petId);
      return res.status(200).json(pet);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  },

  updatePet: async (req, res) => {
    const { petId } = req.params;
    const newPet = req.body;

    try {
      const pet = await Pet.findByIdAndUpdate(petId, newPet);
      if (pet=== null) {
        return res
          .status(400)
          .json({ message: "La mascota no está en la base de datos." });
      } else {
        return res.json({
          message: "La mascota fue actualizado correctamente.",
        });
      }
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },

  deletePet: async (req, res) => {
    const { petId } = req.params;

    try {
      const pet = await Pet.findById(petId);
      const owners = pet.owners;

      const ownersArray = owners.map((owner) => owner.toString());

      for (owner of ownersArray) {
        const ownerFounded = await Owner.findById(owner);
        const newPets = ownerFounded.pets.filter((pet) => pet != petId);

        ownerFounded.pets = newPets;
        await ownerFounded.save();
      }

      await Pet.findByIdAndDelete(petId);
      res.json({ message: "La mascota fue eliminado correctamente." });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};

module.exports = petController;
