const fs = require('fs');
const path = require('path');

// Path to your users.json file
const usersFilePath = path.join(__dirname, '../data/users.json');

// Read users data from users.json
function readUsersData() {
    const usersData = fs.readFileSync(usersFilePath);
    return JSON.parse(usersData);
}

// Write users data to users.json
function writeUsersData(users) {
    const usersData = JSON.stringify(users, null, 2);
    fs.writeFileSync(usersFilePath, usersData);
}

// Get all users and their skills
function getAllUsers() {
    const users = readUsersData();
    return users.users;
}

// Add a new user
function addUser(username, password, isAdmin) {
    const users = readUsersData();
    const newUser = { username, password, isAdmin, skills: [] };
    users.users.push(newUser);
    writeUsersData(users);
    return newUser;
}

// Remove a user
function removeUser(username) {
    const users = readUsersData();
    users.users = users.users.filter(user => user.username !== username);
    writeUsersData(users);
}

// Get a user
function getUser(username, password) {
    const users = readUsersData();
    return users.users.find(user => user.username === username && user.password === password);
}

// Get the skills of a user
function getSkills(username) {
    const users = readUsersData();
    const user = users.users.find(user => user.username === username);
    return user ? user.skills : null;
}

// Add a skill to a user
function addSkill(username, skill) {
    const users = readUsersData();
    const user = users.users.find(user => user.username === username);
    if (user) {
        user.skills.push(skill);
        writeUsersData(users);
    }
}

// Remove a skill from a user
function removeSkill(username, skill) {
    const users = readUsersData();
    const user = users.users.find(user => user.username === username);
    if (user) {
        user.skills = user.skills.filter(userSkill => userSkill !== skill);
        writeUsersData(users);
    }
}

module.exports = {
    getAllUsers,
    addUser,
    removeUser,
    getUser,
    getSkills,
    addSkill,
    removeSkill
};
