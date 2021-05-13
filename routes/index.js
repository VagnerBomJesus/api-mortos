const user = require("./userRoutes");
const morto = require("./mortoRoutes");

// export the routes
module.exports = (app) => {
  app.use("/user", user);
  app.use("/morto", morto);
};