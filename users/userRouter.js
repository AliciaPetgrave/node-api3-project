const express = require('express');
const Users = require('./userDb')

const router = express.Router();

// POST request
router.post('/', validatePost,  (req, res) => {
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    res.status(500).json({message: "There was an error while saving the user to the database"})
  })
});

//POST from user working
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    res.status(500).json({message: "There was an error while saving the post to the database"})
  })
});

// GET all users working
router.get('/', (req, res) => {
  Users.get()
  .then(user => {
    res.status(200).json(user)
  })
  .catch (err => {
    res.status(500).json({error: "The user information could not be retrieved."})
  })
});

// GET user by id working
router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: "The user with this id could not be retrieved."})
  })
});

//GET user's posts working
router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: "The posts from this user could not be retrieved."})
  })
});

//DELETE user working
router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: "The user id could not be retrieved."})
  })
});

//EDIT user
router.put('/:id', validateUser, validateUserId, (req, res) => {
  Users.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: "The user information could not be retrieved."})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
  .then(id => {
    if (id){
      req.user = id
      next()
    } else {
      res.status(400).json({message: "missing user data"})
    }
  })
}

function validateUser(req, res, next) {
  if (!req.body){
    res.status(400).json({message: "missing user data"})
  } else if (!req.body.name){
    res.status(400).json({message: "missing required name field"})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body){
    res.status(400).json({message: "missing post data"})
  } else if (!req.body.text){
    res.status(400).json({message: "missing required text field"})
  } else {
    next()
  }
}

module.exports = router;
