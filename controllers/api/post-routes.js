const router = require('express').Router();
const {Post, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth');
const { post } = require('./comment-routes');

router.post('/', withAuth, (req, res) => {
    const body = req.body;
    Post.create({ ...body, userId: req.session.userId})
    .then(newPost => {
        res.json(newPost);

    }).catch(err => {
        res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
    Post.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(postupdate => {
        if (postupdate > 0) {
            res.status(200).end();
        } 
        else {
            res.status(404).end();
        }
      }).catch(err => {
            res.status(500).json(err);
      });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(deletedPost => {
        if (deletedPost > 0) {
            res.status(200).end();
        }
        else{
            res.status(404).end();
        }
    }).catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;