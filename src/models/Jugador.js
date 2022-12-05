const mongoose = require("mongoose");

const jugadorSchema = mongoose.Schema(
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
    edad: {
      type: Number,
      trim: true,
      required: [true, "Ingrese la edad"],
    },
    identificacion: {
      type: Number,
      trim: true,
      required: [true, "Ingrese la identificación"],
      unique: true,
    },
    dorsal: {
      type: Number,
      trim: true,
      required: [true, "Ingrese el dorsal"],
    },
    posicion: {
      type: String,
      trim: true,
      required: [true, "Ingrese la posición"],
    },
    goles: {
      type: Number,
      trim: true,
      required: [true, "Ingrese los goles de su carrera"],
    },
    nacionalidad: {
      type: String,
      trim: true,
      required: [true, "Ingrese la nacionalidad"],
    },
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("Jugador", jugadorSchema);
