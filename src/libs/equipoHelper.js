const Director = require("../models/Director");
const Jugador = require("../models/Jugador");
exports.buscarDirectorAsignado = async (directorIdentificacion) => {
  try {
    const profesorResponse = await Director.find({
      identificacion: directorIdentificacion,
    });
    return profesorResponse[0]?._id ?? directorIdentificacion
  } catch (error) {
    console.log(error);
  }
};

exports.buscarJugador = async (jugadores) => {
  try {
    const response = await Jugador.find({ identificacion: jugadores });
    return response.map((jugador) => jugador._id);
  } catch (error) {
    console.log(error);
  }
};
