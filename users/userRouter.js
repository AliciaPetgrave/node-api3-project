const express = require('express');
const Users = require('./userDb')

const router = express.Router();

// POST request
router.post('/', (req, res) => {
  Users.insert(req.body)
  .then(user => {
    res,status(201).json(user)
  })
  .catch(error => {
    res.status(500).jason({message: "There was an error while saving the user to the database"})
  })
});

//POST from user
router.post('/:id/posts', (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).jason({message: "There was an error while saving the post to the database"})
  })
});

// GET all users
router.get('/', (req, res) => {
  Users.get()
  .then(user => {
    res.status(200).json(user)
  })
  .catch (err => {
    res.status(500).json({error: "The user information could not be retrieved."})
  })
});

// GET user by id
router.get('/:id', (req, res) => {
  Users.getById(req.params.id)
  .then(user => {
    res.json(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: "The post information could not be retrieved."})
  })
});

//GET user's posts
router.get('/:id/posts', (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: "The post information could not be retrieved."})
  })
});

//DELETE user
router.delete('/:id', (req, res) => {
  Users.remove(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: "The post information could not be retrieved."})
  })
});

//EDIT user
router.put('/:id', (req, res) => {
  Users.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: "The post information could not be retrieved."})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
