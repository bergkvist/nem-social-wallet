const db = require('./models');

async function createDebugModels() {
    const Tobias = await db.Users.create({
        id: 0,
        firstname: 'Tobias',
        lastname: 'Bergkvist',
        email: 'tobias@mail',
    });

    const Mats = await db.Users.create({
        id: 1,
        firstname: 'Mats',
        lastname: 'Skaslien',
        email: 'mats@mail'
    });
}