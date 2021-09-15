const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor ingrese el nombre."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Por favor ingrese los apellidos."],
      trim: true,
    },
    createdBy: {
      type: String,
      required: [true, "Por favor ingrese quién lo añadió."],
      trim: true,
    },
    updatedBy: {
      type: String,
      default: "No updated.",
      trim: true,
    },
    document: {
      type: String,
      required: [true, "Por favor ingrese el documento."],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Por favor ingrese el número."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Por favor ingrese el correo."],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Por favor ingrese la dirección."],
      trim: true,
    },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model("Owner", OwnerSchema);
