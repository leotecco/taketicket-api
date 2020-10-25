const jwt = require("jsonwebtoken");
const Person = require("./../models/person");

const authorize = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, process.env.SECRET);

    req.person = await Person.findById(decoded.id);

    next();
  } catch (error) {
    res.status(401).json({
      message: "Não autenticado!",
    });
  }
};

module.exports = authorize;
