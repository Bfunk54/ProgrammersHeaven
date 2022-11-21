// Require packages needed for the comments routes
const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Post route to add a new comment in the database
router.post("/", withAuth, async (req, res) => {
  try {
    // Create a new comment using the data from the add comment inputs
    const newComment = await Comment.create({
      comment: req.body.body,
      post_id: req.body.postId,
      user_id: req.session.user_id,
    });
    newComment;
    
    console.log(newComment);
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
