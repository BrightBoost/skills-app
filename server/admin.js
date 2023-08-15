const express = require('express');
const data = require('./data');
const adminRouter = express.Router();

// Get all users
adminRouter.get('/users', function (req, res) {
    const users = data.getAllUsers();
    res.json({ status: 'success', users });
});

// Add a new user
adminRouter.post('/users', function (req, res) {
    const { username } = req.body;
    const newUser = data.addUser(username);
    res.json({ status: 'success', user: newUser });
});

// Remove a user
adminRouter.delete('/user/:username', function (req, res) {
    const { username } = req.params;
    const removedUser = data.removeUser(username);
    res.json({ status: 'success', user: removedUser });
});


// Get the skills of a user
adminRouter.get('/user/:username/skills', function (req, res) {
    const { username } = req.params;
    const skills = data.getSkills(username);
    res.json({ status: 'success', skills });
});

// Add a skill to a user
adminRouter.post('/user/:username/skills', function (req, res) {
    const { username } = req.params;
    const { skill } = req.body;
    const updatedUser = data.addSkill(username, skill);
    res.json({ status: 'success', user: updatedUser });
});

// Remove a skill from a user
adminRouter.delete('/user/:username/skills', function (req, res) {
    const { username } = req.params;
    const { skill } = req.body;
    const updatedUser = data.removeSkill(username, skill);
    res.json({ status: 'success', user: updatedUser });
});

module.exports = adminRouter;
