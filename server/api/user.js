const db = require('../models');
const Op = db.Sequelize.Op;

const crypto = require('./crypto');
const express = require('express');
const router = express.Router();



async function createNewUser(name, facebookId) {
    return db.Users.create({

    });
}


async function userExists() {
    const users 
}


async function login()


router.post('/login', (req, res) => {
    
});

//module.exports = { router };