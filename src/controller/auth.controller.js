const Admin = require("../models/Admin");
const createToken = require("../libs/helper");
const { handleError } = require("../libs/handleError");
class ControllerAuth {
  async registerGetController(req, res) {
    try {
      const admins = await Admin.find().select({ password: 0, _id: 0, __v: 0 });
      if (admins.length === 0) {
        return res.status(200).json("Admin no registrado");
      }
	res.status(200).json({msg:"Presidentes de clubs",admins})
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async registerController(req, res) {
    const { email, password,  esSupervisor } = req.body;
    try {
     await Admin.create({ email, password, esSupervisor});
      return res
        .status(201)
        .json("Registrado correctamente!");
    } catch (error) {
      console.log(error)
      handleError(error, res, "Admin");
    }
  }
  async loginController(req, res) {
    let { email, password} = req.body;
    try {
      password = String(password)
      if (email.trim() === "" || password.trim() === "" ) {
        return res
          .status(400)
          .json("Todos los datos son necesarios para iniciar sesión");
      }
      const admin = await Admin.login(email, password, res);
      const token = createToken(admin.email, admin.esSupervisor);
      return res
        .status(200)
        .header("auth-token", token)
        .json(`Bienvenido ${admin.email}`);
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ControllerAuth;
