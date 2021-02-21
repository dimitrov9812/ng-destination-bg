import mongoose from 'mongoose';

// define the properties of the user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 100,
        min: 5
    },
    email: {
        type: String,
        requered: true,
        max: 100,
        min: 5
    },
    password: {
        type: String,
        requiered: true,
        max: 255,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("User", userSchema);