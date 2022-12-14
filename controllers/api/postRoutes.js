// Require packages needed for the post routes
const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// Post route to add a new post in the database
router.post("/", withAuth, async (req, res) => {
  try {
    // Create a new post using the data from the create a new post inputs
    const postData = await Post.create({
      post_title: req.body.name,
      post: req.body.content,
      user_id: req.session.user_id,
    });
    postData;

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
