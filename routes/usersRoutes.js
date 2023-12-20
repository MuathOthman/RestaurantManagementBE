const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/usersController');


router.get('/', getUsers);
router.get('/:id', getUserByID);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;