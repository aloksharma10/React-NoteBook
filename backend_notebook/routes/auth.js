const express = require('express')
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const fetchuser = require('../middleware/fetchuser')
const Router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sign = "alokisagoodboy"

// Routes 1
Router.post('/createuser', [
    body('name', "Please enter a valid name").isLength({ min: 2 }),
    body('email', "Please enter a valid Email").isEmail(),
    body('password', "Password must be atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)

        // Create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        let data = {
            user: {
                id: user.id
            }
        }
        let authToken = jwt.sign(data, sign)
        res.json({ authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

// Routes 2
Router.post('/login', [
    body('email', "Please enter a valid Email").isEmail(),
    body('password', "Password must be atleast 5 characters").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let { email, password } = req.body
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Sorry! Invalid Credentials" })
        }
        let passCompare = await bcrypt.compare(password, user.password)
        if (!passCompare) {
            return res.status(400).json({ error: "Sorry! Invalid Credentials" })
        }
        let data = {
            user: {
                id: user.id
            }
            // user: {
            //     email: user.email
            // }
        }
        let authToken = jwt.sign(data, sign)
        res.json({ authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})


// Routes 3
Router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id
        // userId = req.user.email
        const user = await User.findById(userId).select('-password')
        // const user = await User.find({"email": userId  }).select('-password')
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})

module.exports = Router