const jwt = require("jsonwebtoken");
const createToken = (email, isSuperAdmin) => {
  const payload = {
    email,
    isSuperAdmin,
  };
  const expiresIn = "1h";
  const tokenRegister = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn,
  });
  return tokenRegister;
};
module.exports = createToken;
