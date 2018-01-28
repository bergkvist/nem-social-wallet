const db = require('../models');
const crypto = require('../api/crypto');

async function createDebugModels() {
    const Tobias = await db.Users.create({
        fullname: 'Tobias Bergkvist',
        email: 'tobias@mail',
    });

    const Mats = await db.Users.create({
        fullname: 'Mats Jørgen Skaslien',
        email: 'mats@mail'
    });
}

module.exports = {
    createDebugModels
};