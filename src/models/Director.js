const mongoose = require("mongoose");

const directorSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: [true, "Ingrese un nombre"],
      lowercase: true,
    },
    apellido: {
      type: String,
      trim: true,
      required: [true, "Ingrese el apellido"],
      lowercase: true,
    },
    identificacion: {
      type: Number,
      trim: true,
      unique: true,
      required: [true, "Ingrese la identificación"],
    },
    edad: {
      type: Number,
      trim: true,
      required: [true, "Ingrese la edad"],
    },
    fueJugador: {
      type: Boolean,
      required: [true, "Identifique si una vez fue jugador"],
    },
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("Director", directorSchema);
