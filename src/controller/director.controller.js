const Director = require("../models/Director");
const { handleError, handleErrorId } = require("../libs/handleError");

module.exports = class DirectorController {
  getDirector(req, res) {
    Director.find()
      .then((directores) => {
        if (directores.length !== 0) {
          return res.status(200).json({ directores });
        }
        return res.status(200).json("directores no registrados");
      })
      .catch((e) => {
        res.status(500).json(e);
      });
  }
  getDirectorId(req, res) {
    const { id } = req.params;
    Director.findById(id)
      .then((director) => {
        if (!director) {
          return res.status(400).json("Este ID de Director no existe");
        }
        res.status(200).json({ msg: "Director obtenido", director });
      })
      .catch((e) => {
        handleErrorId(e, res);
      });
  }
  deleteDirector(req, res) {
    const { id } = req.params;
    Director.findByIdAndDelete({ _id: id })
      .then((estado) => {
        if (!estado) {
          return res.status(400).json("Este ID no corresponde a un Director");
        }
        res.status(200).json("Director Eliminado");
      })
      .catch((e) => {
        handleErrorId(e, res);
      });
  }
  async putDirector(req, res) {
    const { id } = req.params;
    let { nombre, apellido, identificacion, fueJugador, edad } = req.body;
    identificacion = String(identificacion);
    try {
      if (
        nombre.trim() !== "" &&
        apellido.trim() !== "" &&
        identificacion.trim() !== "" &&
        fueJugador !==  undefined &&
        edad !== undefined
      ) {
        const directorActualizado = await Director.findByIdAndUpdate(
          { _id: id },
          { nombre, apellido, identificacion, fueJugador, edad },
          {
            new: true,
          }
        );
        if (!directorActualizado) {
          return res
            .status(400)
            .json("ID no registrado, no se puede actualizar");
        }
        return res
          .status(201)
          .json({ msg: "Actualizado", directorActualizado });
      }
      return res
        .status(400)
        .json("Todos los datos son obligatorios para actualizar");
    } catch (error) {
      handleErrorId(error, res);
    }
  }
  async postDirector(req, res) {
    const { nombre, apellido, identificacion, fueJugador, edad } = req.body;
    try {
      const DirectorSchema = new Director({
        nombre,
        apellido,
        identificacion,
        fueJugador,
        edad
      });
      await DirectorSchema.save();
      res.status(201).json({ msg: "Director añadido", DirectorSchema });
    } catch (error) {
      handleError(error, res, "Director");
    }
  }
};
