const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    movies: [{
        name: {
            type: String,
            required: true,
        },
        thumb: {
            type: String,
        },
        rating: {
            type: Number,
            required: true,
        }
    }],
});

module.exports = mongoose.model('User', schema);