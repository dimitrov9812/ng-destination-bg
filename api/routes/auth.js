// Authentication routes
import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const router = express();
const User = require('../models/User');

router.post('/register', expressAsyncHandler(async (req,res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    console.log(user);
    try {
        const savedUser = await user.save();
        res.send("Successfully saved user!");
        res.send(savedUser);
        console.log('2')
    } catch (err) {
        res.send(err);
        console.log(err);
    }
}));

router.post('/login', (req,res) => {
    res.send('Trying to login')
})

module.exports = router;