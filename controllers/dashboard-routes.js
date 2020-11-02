const router = require('express').Router();
const {Post} = require('../models');
const withAuth = require('../utils/auth');

router.get("/", withAuth, (req, res) => {
    Post.findAll({
      where: {
        userId: req.session.userId
      }
    }).then(dbPostData => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        
        res.render("all-posts-admin", {
          layout: "dashboard",
          posts
        });
      }).catch(err => {
        console.log(err);
        res.redirect("login");
    });
});

module.exports = router;