const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Ingrese un email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Ingrese un email valido"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Ingrese un password"],
    minlength: [6, "El password debe tener una longitud de 6 caracteres"],
  },
  esSupervisor:{
    type: Boolean,
    required: [true, "Ingrese el rango del administrador"],
  }
    
});

adminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.statics.login = async function (email, password, res) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    res.status(401).json("El Password es incorrecto");
    return;
  }
  return res.status(401).json("El Email es  incorrecto");
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
