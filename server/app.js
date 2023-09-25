require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./model/user');
const auth = require('./middleware/auth');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
      res.status(400).send('All inputs are required');
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
      expiresIn: '2h',
    });
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ error: 'All inputs are required' });
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
        expiresIn: '2h',
      });

      user.token = token;

      res.status(200).json(user);
    }
    res.status(400).send({ error: 'Invalid Credentials' });
  } catch (err) {
    console.log(err);
  }
});

app.get('/welcome', auth, (req, res) => {
  res.status(200).send('Welcome 🙌 ');
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: 'false',
    message: 'Page not found',
    error: {
      statusCode: 404,
      message: 'You reached a route that is not defined on this server',
    },
  });
});

module.exports = app;
