const { Router } = require("express");
const EquipoController = require("../controller/equipo.controller");
const controller = new EquipoController();
const AuthToken = require("../middleware/authToken");
const router = Router();


//SUPERVISOR - SOLO PERMITIDO READ
router.get("/", controller.getEquipo);
router.get("/:id", controller.getEquipoId);

//Admin -  PERMITIDO READ & WRITE
router.post("/", AuthToken.isAdmin, controller.postEquipo);
router.put("/:id", AuthToken.isAdmin, controller.putEquipo);
router.delete("/:id", AuthToken.isAdmin, controller.deleteEquipo);
module.exports = router;
