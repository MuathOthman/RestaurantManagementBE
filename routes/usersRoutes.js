const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserByID,
    createUser,
    loginUser,
    updateUser,
    deleteUser
} = require('../controllers/usersController');


router.get('/', getUsers);
router.post('/login', loginUser);
router.get('/:id', getUserByID);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;