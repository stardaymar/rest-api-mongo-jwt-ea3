const mongoose = require("mongoose");

const equipoSchema = mongoose.Schema(
  {
    nombre: {
      required: true,
      type: String,
      required: [true, "nombre es requerido"],
      unique: true,
    },
    descripcion: {
      required: true,
      type: String,
      trim: true,
      required: [true, "Descripcion es requerida"],
    },
    directorPrincipal: {
      required: true,
      ref: "Director",
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "El Director es requerido"],
    },
    jugadores: [
      {
        required: [true, "Los id de los jugadores son requeridos"],
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jugador",
        trim: true,
      },
    ],
    nombreEstadio: {
      required: true,
      type: String,
      trim: true,
      required: [true, "El nombre del estadio es requerido"],
      lowercase: true,
    },
    totalPartidos: {
      required: true,
      type: Number,
      trim: true,
      required: [true, "El total de partidos es requerido"],
      lowercase: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Equipo", equipoSchema);
