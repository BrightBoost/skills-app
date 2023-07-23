const express = require('express');
const data = require('./data');

const userRouter = express.Router();


// User login
userRouter.post('/login', function(req, res) {
    const { username, password } = req.body;
    const user = data.getUser(username, password);
    if(user) {
        res.json({ status: 'success', user });
    } else {
        res.json({ status: 'fail', message: 'Invalid username or password' });
    }
});

// User logout
userRouter.post('/logout', function(req, res) {
    res.json({ status: 'success', message: 'User logged out successfully' });
});

// Get the skills of the logged-in user
userRouter.get('/:username/skills', function(req, res) {
    const username = req.params.username;
    const skills = data.getSkills(username);
    res.json({ status: 'success', skills });
});

// Add a skill to the logged-in user
userRouter.post('/skills', function(req, res) {
    const { username, skill } = req.body;
    data.addSkill(username, skill);
    res.json({ status: 'success', message: 'Skill added successfully' });
});

module.exports = userRouter;
