const JugadorModel = require("../models/Jugador");
const { handleError, handleErrorId } = require("../libs/handleError");
module.exports = class Controllerjugador {
  getjugador(req, res) {
    JugadorModel.find()
      .then((jugadores) => {
        if (jugadores.length !== 0) {
          return res.status(200).json({ jugadores });
        }
        return res.status(201).json("jugadores no registrados");
      })
      .catch((e) => {
        res.status(500).json(e);
      });
  }
  getjugadorId(req, res) {
    const { id } = req.params;
    JugadorModel.findById({ _id: id })
      .then((jugador) => {
        if (!jugador) {
          return res.status(400).json("Este ID de jugador no existe");
        }
        return res.status(200).json({ msg: "jugador por ID", jugador });
      })
      .catch((e) => {
        handleErrorId(e, res);
      });
  }
  deletejugador(req, res) {
    const { id } = req.params;
    JugadorModel.findByIdAndDelete({ _id: id })
      .then((estado) => {
        if (!estado) {
          return res.status(400).json("Este ID no corresponde a un jugador");
        }
        res.status(200).json("jugador eliminado");
      })
      .catch((e) => {
        handleErrorId(e, res);
      });
  }
  async postjugador(req, res) {
    let {
      nombre,
      apellido,
      identificacion,
      dorsal,
      goles,
      nacionalidad,
      posicion,
      edad
    } = req.body;
    try {
      identificacion = String(identificacion);
      let jugadorSchema = new JugadorModel({
        nombre,
        apellido,
        identificacion,
        dorsal,
        goles,
        nacionalidad,
        posicion,
        edad
      });
      await jugadorSchema.save();
      res.status(201).json(jugadorSchema);
    } catch (error) {
      console.log(error)
      handleError(error, res, "jugador");
    }
  }
  async putController(req, res) {
    let { id } = req.params;
    let {
      nombre,
      apellido,
      identificacion,
      dorsal,
      goles,
      nacionalidad,
      posicion,
      edad
    } = req.body;
    identificacion = String(identificacion);
    try {
      if (
        nombre.trim() === "" ||
        apellido.trim() === "" ||
        identificacion === undefined ||
        nacionalidad.trim() === "" ||
        posicion.trim() === "" ||
        dorsal === undefined ||
        edad === undefined ||
        goles === undefined
      ) {
        return res
          .status(400)
          .json("Todos los datos son necesarios para actualizar");
      }
      const jugador = await JugadorModel.findByIdAndUpdate(
        { _id: id },
        {
          nombre,
          apellido,
          identificacion,
          dorsal,
          goles,
          nacionalidad,
          posicion,
          edad
        },
        { new: true }
      );
      if (!jugador) {
        return res.status(400).json("ID no registrado, no se puede actualizar");
      }
      return res.status(201).json({ msg: "Jugador actualizado", jugador });
    } catch (error) {
      handleErrorId(error, res);
    }
  }
};
