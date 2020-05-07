const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    email: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
    },

    firstname: {
        type: String, 
        required: true,
        trim: true,
    },

    lastname: {
        type: String, 
        required: true,
        trim: true,
    },

    sold: {
        type: Boolean,
        default: false,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;