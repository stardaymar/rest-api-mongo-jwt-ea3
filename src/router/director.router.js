const { Router } = require("express");
const router = Router();
const DirectorController = require("../controller/director.controller");
const AuthToken = require("../middleware/authToken");
const controller = new DirectorController();

//SUPERVISOR - SOLO PERMITIDO READ
router.get("/", controller.getDirector);
router.get("/:id", controller.getDirectorId);

//Admin -  PERMITIDO READ & WRITE
router.post("/", AuthToken.isAdmin, controller.postDirector);
router.delete("/:id", AuthToken.isAdmin, controller.deleteDirector);
router.put("/:id", AuthToken.isAdmin, controller.putDirector);
module.exports = router;
