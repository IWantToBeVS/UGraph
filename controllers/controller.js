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

        const token = jwt.sign({ userId: data._id }, process.env.SECRET_KEY, { expiresIn: '30d'});

        const output = await data.save();

        res.status(200).json({ success: true, message: 'User Login Successful', token: token});

        
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

        const token = jwt.sign({userId: User._id}, process.env.SECRET_KEY, { expiresIn: "30d"});

        res.status(200).json({ success: true, message: 'User Login Successful', token: token});

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"});
    }


}

const authenticate = async (req, res) => {

    try {
        const { token } = req.body;
        console.log('Recieved data: ', token);

        const ID = jwt.verify(token, process.env.SECRET_KEY);

        const output = await User.findById(ID.id);

        if (!output){
            res.status(201).json({ message: "Token Invalid" })
        }

        res.status(200).json({success: true, message: 'Valid token'})

    }
    catch (error) {
        console.error(error);
    }

}

module.exports = {
    signup,
    login,
    authenticate,
}