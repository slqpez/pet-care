const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor ingrese el nombre."],
      trim: true,
    },
    breed: {
      type: String,
      required: [true, "Por favor ingrese la raza."],
      trim: true,
    },
    size: {
      type: String,
      required: [true, "Por favor ingrese el tamaño."],
      trim: true,
    },
    age: {
      type: String,
      required: [true, "Por favor ingrese el tamaño."],
      trim: true,
    },
    vaccination: {
      type: String,
      required: [true, "Por favor ingrese el plan de vacunación."],
      trim: true,
    },
    cares: {
      type: String,
      required: [true, "Por favor ingrese los cuidados a tener."],
      trim: true,
    },
    owners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }],
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Pet", PetSchema);
