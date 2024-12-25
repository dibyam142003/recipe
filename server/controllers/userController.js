// server/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.showRegistrationForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.registerUser  = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser  = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser .save();
    res.redirect('/login'); // Redirect to login page after successful registration
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

// In userController.js
exports.showLoginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.loginUser  = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user._id; // Store user ID in session
    res.redirect('/'); // Redirect to homepage after successful login
  } else {
    res.status(401). send({ message: 'Invalid email or password' }); // Handle invalid login
  }
};