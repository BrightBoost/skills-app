const express = require('express');
const data = require('./data');

const userRouter = express.Router();


// User login
userRouter.post('/login', function (req, res) {
    const { username, password } = req.body;
    // Not how you would do this in a real environment!
    const user = data.getUser(username, password);
    if (user) {
        req.session.username = user.username;
        req.session.userId = user.id;
        console.log(req.sessionID);
        res.send({ status: 'success', user: user, sessionID: req.sessionID });
    } else {
        res.json({ status: 'fail', message: 'Invalid username or password' });
    }
});

// User logout
userRouter.post('/logout', function (req, res) {
    req.session.destroy(function (err) {
        console.log('User logged out')
    })
    res.json({ status: 'success', message: 'Logged out successfully' });
});

// Get the skills of the loggedin user
userRouter.get('/skills', function (req, res) {
    console.log("Getting skills for user with id: " + req.session.userId);
    const skills = data.getSkills(req.session.userId);
    res.json({ status: 'success', skills });
});

// Add a skill to the logged-in user
userRouter.post('/skills', function (req, res) {
    const { skill } = req.body;
    data.addSkill(req.session.userId, skill);
    res.json({ status: 'success', message: 'Skill added successfully' });
});

module.exports = userRouter;
