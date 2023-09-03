const express = require('express');
const adminRouter = express.Router();
const data = require('./data');

// Check if the user is admin
function checkIfLoggedInUserIsAdmin(req) {
    const users = readUsersData();
    const user = users.users.find(user => user.id === req.session.userId);
    if(user.isAdmin) {
        return true;
    } else {
        return false;
    }
}

// Get all users
adminRouter.get('/users', function (req, res) {
    if(!checkIfLoggedInUserIsAdmin) {
        return res.json({ status: 'failed', message: "You need admin rights." });
    }
    const users = data.getAllUsers();
    res.json({ status: 'success', users });
});

// Add a new user
adminRouter.post('/users', function (req, res) {
    if(!checkIfLoggedInUserIsAdmin) {
        return res.json({ status: 'failed', message: "You need admin rights." });
    }
    const { username, password } = req.body;
    const newUser = data.addUser(username, password);
    res.json({ status: 'success', user: newUser });
});

// Remove a user
adminRouter.delete('/user/:userId', function (req, res) {
    if(!checkIfLoggedInUserIsAdmin) {
        return res.json({ status: 'failed', message: "You need admin rights" });
    }
    const { userId } = req.params;
    const removedUser = data.removeUser(userId);
    res.json({ status: 'success', user: removedUser });
});


// Get the skills of a user
adminRouter.get('/user/:userId/skills', function (req, res) {
    if(!checkIfLoggedInUserIsAdmin) {
        return res.json({ status: 'failed', message: "You need admin rights" });
    }
    const { userId } = req.params;
    const skills = data.getSkills(userId);
    res.json({ status: 'success', skills });
});

// Add a skill to a user
adminRouter.post('/user/:userId/skills', function (req, res) {
    if(!checkIfLoggedInUserIsAdmin) {
        return res.json({ status: 'failed', message: "You need admin rights" });
    }
    const { userId } = req.params;
    const { skill } = req.body;
    const updatedUser = data.addSkill(userId, skill);
    res.json({ status: 'success', user: updatedUser });
});

// Remove a skill from a user
adminRouter.delete('/user/:userId/skills', function (req, res) {
    if(!checkIfLoggedInUserIsAdmin) {
        return res.json({ status: 'failed', message: "You need admin rights" });
    }
    const { userId } = req.params;
    const { skill } = req.body;
    const updatedUser = data.removeSkill(userId, skill);
    res.json({ status: 'success', user: updatedUser });
});

module.exports = adminRouter;
