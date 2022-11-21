// Require packages needed for the home routes
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session to handlebars
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single post by id
router.get('/post/:id', async (req, res) => {
  try {
    // Find a single post by id and include the user data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Get the all the comments for that post
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize the comment data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Serialize the post data so the template can read it
    const post = postData.get({ plain: true });

    // Pass the post, comments, and session data to handlebars
    res.render('single-post', {
      ...post,
      comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    // Pass the user and session data to handlebars
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get data to use in the create a post page
router.get("/create-post", withAuth, (req, res) => {

  // Create an object with the username and user id from the session
  const currentUser = {
    user_id: req.session.user_id,
    name: req.session.name
  }

  // Render the page with that object and pass logged in status to handlebars
  res.render("create-post", {
    currentUser,
    logged_in: req.session.logged_in
  });
});

// Get data to render the login page if they're not already logged in
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
