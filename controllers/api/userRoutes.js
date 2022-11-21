// Require packages needed for the user routes
const router = require('express').Router();
const { User } = require('../../models');

// Post route to add a new user in the database
router.post('/', async (req, res) => {
  try {
    // Create a new user using the data from the signup inputs
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.name = userData.name;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Post route to login a user
router.post('/login', async (req, res) => {
  try {
    // Find the user in the database using the email from the login inputs
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If the user is not found, send a message saying either the email or password is incorrect
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // If the user is found, check the password
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is incorrect, send a message saying either the email or password is incorrect
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // If the password is correct, save the user's information in the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.name = userData.name;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Post route to logout a user
router.post('/logout', (req, res) => {
  // If the user is logged in, destroy the session
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
