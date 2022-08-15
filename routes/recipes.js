const express = require('express');
const Recipe = require('../models/recipe')
const recipesRouter = express.Router();
const cors = require('./cors');

recipesRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.corsWithOptions, (req, res, next) => {
    Recipe.find()
    .then(recipes => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipes);
    })
    .catch(err => next(err)); 
})
.post(cors.corsWithOptions, (req, res) => {
    Recipe.create(req.body)
    .then(recipe => {
        console.log(`Recipe Created: ${recipe}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipe);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /recipes');
})
.delete(cors.corsWithOptions, (req, res, next) => {
    Recipe.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
})

recipesRouter.route('/:recipeId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.corsWithOptions, (req, res, next) => {
    Recipe.findById(req.params.recipeId)
    .then(recipe => {
        console.log(`Found recipe: ${recipe}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipe);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, (req, res) => {
    res.statusCode = 403;
    res.end('POST operation is not available for this route');
})
.put(cors.corsWithOptions, (req, res, next) => {
    Recipe.findByIdAndUpdate(req.params.recipeId, { $set: req.body }, { new: true })
    .then(recipe => {
        console.log(`Updated recipe: ${recipe}`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(recipe);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, (req, res, next) => {
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