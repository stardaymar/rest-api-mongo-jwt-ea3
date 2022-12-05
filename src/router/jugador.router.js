const { Router } = require("express");
const router = Router();
const ControllerJugador = require("../controller/jugador.controller");
const AuthToken = require("../middleware/authToken");
const controller = new ControllerJugador();

//SUPERVISOR - SOLO PERMITIDO READ
router.get("/", controller.getjugador);
router.get("/:id", controller.getjugadorId);

//Admin -  PERMITIDO READ & WRITE
router.post("/", AuthToken.isAdmin,  controller.postjugador);
router.delete("/:id", AuthToken.isAdmin,  controller.deletejugador);
router.put("/:id", AuthToken.isAdmin,  controller.putController);
module.exports = router;
