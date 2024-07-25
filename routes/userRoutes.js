const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getUsers);

router.post('/add-user', userController.createUser);
router.get('/edit-user/:userId', userController.getEditUser);
router.post('/edit-user', userController.postEditUser);

router.post('/delete-user', userController.deleteUser);

module.exports = router;
