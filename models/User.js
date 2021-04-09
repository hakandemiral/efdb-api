const { model, Schema, Types } = require('mongoose');

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    watchList: [{
        movieId: {
            type: Types.ObjectId,
            required: true
        },
        isWatched: {
            type: Boolean,
            default: false
        }
    }],
    created_at: {
        type: Date,
        default: Date.now,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = model('User', UserSchema);