const Equipo = require("../models/Equipo");
const {
  buscarDirectorAsignado,
  buscarJugador,
} = require("../libs/equipoHelper");
const { handleError, handleErrorId } = require("../libs/handleError");
module.exports = class ControllerEquipo {
  getEquipo(req, res) {
    Equipo.find()
      .populate("directorPrincipal")
      .populate("jugadores")
      .then((equipos) => {
        if (equipos.length === 0) {
          return res.status(200).json("No existen Equipos Registrados");
        }
        return res.status(200).json({ equipos });
      })
      .catch((e) => {
        res.status(500).json(e);
      });
  }
  async postEquipo(req, res) {
    const {
      nombre,
      descripcion,
      directorPrincipal,
      jugadores,
      nombreEstadio,
      totalPartidos,
    } = req.body;
    try {
      const idDirector = await buscarDirectorAsignado(directorPrincipal);
      const jugadoresId = await buscarJugador(jugadores);
      const equipoSchema = new Equipo({
        nombre,
        descripcion,
        directorPrincipal: idDirector,
        jugadores: jugadoresId,
        nombreEstadio,
        totalPartidos,
      });
      await equipoSchema.save();
      res.status(201).json({ msg: "Equipo Creado", equipoSchema });
    } catch (error) {
      handleError(error, res, "Equipo");
    }
  }
  async getEquipoId(req, res) {
    const { id } = req.params;
    try {
      const equipo = await Equipo.find({ _id: id })
        .populate("directorPrincipal")
        .populate("jugadores");
      if (!equipo || equipo.length === 0) {
        return res.status(400).json("Este ID de Equipo no existe");
      }
      res.status(200).json(equipo);
    } catch (error) {
      handleErrorId(error, res);
    }
  }
  async deleteEquipo(req, res) {
    const { id } = req.params;
    try {
      const respuesta = await Equipo.findByIdAndDelete({
        _id: id,
      });
      if (!respuesta) {
        return res.status(400).json("Este ID no corresponde a un Equipo");
      }
      res.status(200).json("Equipo eliminado correctamente");
    } catch (error) {
      handleErrorId(error, res);
    }
  }
  async putEquipo(req, res) {
    const { id } = req.params;
    const {
      nombre,
      descripcion,
      directorPrincipal,
      jugadores,
      nombreEstadio,
      totalPartidos,
    } = req.body;
    try {
      if (
        !nombre ||
        !descripcion ||
        directorPrincipal === undefined ||
        !jugadores ||
        jugadores.length === 0 ||
        !nombreEstadio ||
        totalPartidos === undefined
      ) {
        return res.status(400).json("Todos los datos son requeridos");
      }

      const idDirector = await buscarDirectorAsignado(directorPrincipal);
      const jugadoresId = await buscarJugador(jugadores);
      const EquipoActualizado = await Equipo.findOneAndUpdate(
        { _id: id },
        {
          nombre,
          descripcion,
          directorPrincipal: idDirector,
          jugadores: jugadoresId,
          nombreEstadio,
          totalPartidos,
        },
        { new: true }
      );
      if (!EquipoActualizado) {
        return res.status(400).json("ID no registrado, no se puede actualizar");
      }
      res.status(201).json({ msg: "Equipo actualizado", EquipoActualizado });
    } catch (error) {
      handleErrorId(error, res);
    }
  }
};
