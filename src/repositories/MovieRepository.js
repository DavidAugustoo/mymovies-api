const { response } = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const ObjectId = require('mongodb').ObjectId;

exports.get = async(id) => {
    const movies = await User.find({id: id}, {
        name: 1,
        movies: 1,
        _id: 1
    });
    return movies;
}

exports.create = async(id, data) => {
    
    await User.findOneAndUpdate(id, {
        $addToSet: {
            movies: data
        }
    });
}

exports.update = async (id, data) => {
    let response = await User.findOneAndUpdate({"_id" : ObjectId(id), "movies._id": ObjectId(data.id)}, {
        $set: {
            "movies.$.name": data.name,  
            "movies.$.thumb": data.thumb,
            "movies.$.rating": data.rating,
        }
    });

    if(response == null) {
        return false
    } else {
        return true
    }
    
}

exports.delete = async(id, data) => {
    await User.findOneAndUpdate(id,
        { $pull: { 
            movies: { _id: data.id } 
        } 
    });
}