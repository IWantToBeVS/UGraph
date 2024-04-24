const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const signup = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        console.log('Recieved Data');

        const finder = await User.findOne({username});

        if (finder){
            res.status(401).json({message: 'User Already Exists'});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const data = new User({
            username,
            email,
            password: hashedPassword,
        });

        const output = await data.save();

        const token = jwt.sign({ userId: data._id }, 'HelloReact', { expiresIn: '30d'});

        res.status(201).json({ token });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
    
}

const login = async (req, res) => {

    try {
        const {username, password} = req.body;
        console.log('Recieved Data: ', req.body);

        const output = await User.findOne({username});

        if (!output){
            return res.status(401).json({ message: 'Invalid Credentials'});
        }

        const passwordMatch = await bcrypt.compare(password, output.password);

        if (!passwordMatch){
            return res.status(401).json({ message: 'Invalid Credentials'});
        }

        const token = jwt.sign({userId: User._id}, 'HelloReact', { expiresIn: "30d"});

        res.status(200).json({ token });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"});
    }


}

module.exports = {
    signup,
    login
}