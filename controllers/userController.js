const { where } = require('sequelize');
const User = require('../models/user');

exports.createUser = (req, res) => {
    const { name, phoneNumber, email } = req.body;
    User.create({ name, phoneNumber, email })
    .then(user=> {
        console.log("User Created");
        res.redirect('/')})
    .catch (error=> res.status(500).json({ error: error.message }));
};

exports.getUsers = (req, res) => {
    User.findAll()
    .then( users=> {
        res.render('index', {
          users: users,
          path: '/',
          editing: false
        })
    })
    .catch(error=> res.status(500).json({ error: error.message }));
};

exports.getEditUser = (req, res, next) => {
    const editMode = req.query.edit;
    console.log(editMode);
    if (!editMode) {
        return res.redirect('/');
    }
    const userId = req.params.userId;
    User.findByPk(userId)
        .then(user => {
            res.render('index', {
                pageTitle: 'Edit User',
                path: 'index',
                editing: editMode,
                user: user
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
};

exports.postEditUser = (req, res) => {
    const userId = req.body.userId;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;

    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.redirect('/');
            }
            user.name = name;
            user.phoneNumber = phoneNumber;
            user.email = email;
            return user.save();
        })
        .then(result => {
            console.log('User updated successfully');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
};

exports.deleteUser = (req, res) => {
    const id  = req.body.userId;
    User.findByPk(id)
    .then(user=>{
        return user.destroy();
    })
    .then(()=>{
        console.log("User Destroyed");
        res.redirect("/");
    })
    .catch(error=> res.status(500).json({ error: error.message }));
};
