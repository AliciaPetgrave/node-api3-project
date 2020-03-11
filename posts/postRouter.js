const express = require('express');
const Posts = require('./postDb')

const router = express.Router();

//GET request 
router.get('/', (req, res) => {
  Posts.get()
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    res.status(500).json({error: "The posts information could not be retrieved."})
  })
});

//GET post by id
router.get('/:id', (req, res) => {
  Posts.getById(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    res.status(500).json({error: "The post information could not be retrieved."})
  })
});

//DELETE post by id
router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    res.status(500).json({error: "The post could not be removed"})
  })
});

//EDIT post by id
router.put('/:id', (req, res) => {
  Posts.update(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    res.status(500).json({error: "The post information could not be modified."})
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
