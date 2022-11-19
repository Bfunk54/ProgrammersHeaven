const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
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
