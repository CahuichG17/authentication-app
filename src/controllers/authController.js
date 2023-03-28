const User = require('../models/user');


// Función para renderizar la vista principal
function getIndex(req, res) {
  res.render('index');
}
// Función para renderizar la vista register
function getRegister(req, res) {
  res.render('register', { message: 'Invalid username or password'});
}

// Función para renderizar la vista login
function getLogin(req, res) {
  res.render('login', { message: 'Invalid username or password' });
}

// Función para iniciar sesión
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Buscamos el usuario en la base de datos
    const user = await User.findOne({ email });

    // Si el usuario no existe, retornamos un error
    if (!user) {
      return res.status(400).json({ msg: 'El usuario no existe' });
    }

    // Verificamos si la contraseña es correcta
    const isMatch = await user.comparePassword(password);

    // Si la contraseña es incorrecta, retornamos un error
    if (!isMatch) {
      return res.status(400).json({ msg: 'La contraseña es incorrecta' });
    }

    // Generamos un token para el usuario
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 60 * 60 * 24 // Caduca en 24 horas
    });

    // Enviamos el token y los datos del usuario como respuesta
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al iniciar sesión' });
  }
}

// Función para obtener la información del usuario actual
async function getUser(req, res) {
  try {
    // Buscamos el usuario en la base de datos
    const user = await User.findById(req.user.id).select('-password');

    // Enviamos los datos del usuario como respuesta
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener la información del usuario' });
  }
}

module.exports = {
  login,
  getUser,
  getIndex,
  getRegister,
  getLogin
};
