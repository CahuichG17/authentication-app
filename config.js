require('dotenv').config();

//const PORT=3000;
const MONGO_URI="mongodb://127.0.0.1:27017/authentication-app";
//const SECRET=mi-clave-secreta


module.exports = {
  port: 3000,
  mongoURI: MONGO_URI,
  //secret: process.env.SECRET
};
