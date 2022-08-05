const express = require('express');
const recipesRouter = express.Router();

recipesRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the recipes to you');
})
.post((req, res) => {
    res.end(`Will add the recipe: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /recipes');
})
.delete((req, res) => {
    res.end('Deleting all recipes');
})

module.exports = recipesRouter;