const jwt = require("jsonwebtoken");
module.exports = class AuthToken {
  static autenticationRequired(req, res, next) {
    try {
      const tokenHeader = req.headers["auth-token"];
      if (!tokenHeader) {
        return res.status(401).json("No existe token");
      }
      const tokenDedoce = jwt.verify(tokenHeader, process.env.SECRET_KEY);
      const { email, isSuperAdmin } = tokenDedoce;
      req.adminEmail = email;
      req.isAdmin = isSuperAdmin;
      next();
    } catch ({ message }) {
      if (message === "jwt expired") {
        res.status(403).json("El Token Expiró, vuelve a iniciar sesión");
      } else {
        res.status(403).json("Este token es invalido");
      }
    }
  }
  static isAdmin(req, res, next) {
    if (req.isAdmin) {
      next();
    } else {
      res.status(403).json("No tienes permisos para realizar esta acción");
    }
  }
};
