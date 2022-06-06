const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
    },
    thumb: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Movie', schema);