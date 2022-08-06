const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String
    }],
    directions: [{
        type: String
    }],
    tags: [{
        type: String
    }],
    notes: {
        type: String
    }
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;