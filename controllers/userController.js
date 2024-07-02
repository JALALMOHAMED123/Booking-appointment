const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
        const { username, phoneNumber, email } = req.body;
        const user = await User.create({ username, phoneNumber, email });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({ where: { id } });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
