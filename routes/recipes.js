const express = require('express');
const Recipe = require('../models/recipe')
const recipesRouter = express.Router();

recipesRouter.route('/')
.get((req, res, next) => {
    Recipe.find()
    .then(recipes => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipes);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    Recipe.create(req.body)
    .then(recipe => {
        console.log(`Recipe Created: ${recipe}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipe);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /recipes');
})
.delete((req, res, next) => {
    Recipe.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
})

recipesRouter.route('/:recipeId')
.get((req, res, next) => {
    Recipe.findById(req.params.recipeId)
    .then(recipe => {
        console.log(`Found recipe: ${recipe}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipe);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation is not available for this route');
})
.put((req, res, next) => {
    Recipe.findByIdAndUpdate(req.params.recipeId, { $set: req.body }, { new: true })
    .then(recipe => {
        console.log(`Updated recipe: ${recipe}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipe);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Recipe.findByIdAndDelete(req.params.recipeId)
    .then(recipe => {
        console.log(`Recipe deleted: ${recipe}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipe);
    })
    .catch(err => next(err));
})

module.exports = recipesRouter;