const fs = require('fs');
const path = require('path');

// Path to your users.json file
const usersFilePath = path.join(__dirname, '../data/users.json');

// Path to new id file
const newUserIdFile = path.join(__dirname, '../data/nextId.json');


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
    const usersData = readUsersData();
    return usersData.users;
}

// Get new Id and increase Id
function getNextUserId() {
    // Read the file to find the next value for id
    const nextIdData = JSON.parse(fs.readFileSync(newUserIdFile));
    // Increment this by one after assigning the next value to id (so if it 3, 3 gets assigned to id and 4 is the new value of userId)
    let id = nextIdData.userId++;
    // Write the new value to the file
    fs.writeFileSync(newUserIdFile, JSON.stringify(nextIdData));
    return id;
}

// Add a new user
function addUser(username, password, isAdmin=false) {
    let id = getNextUserId();
    const usersData = readUsersData();
    const newUser = { id, username, password, isAdmin, skills: [] };
    usersData.users.push(newUser);
    writeUsersData(usersData);
    return newUser;
}

// Remove a user
function removeUser(userId) {
    const usersData = readUsersData();
    usersData.users = usersData.users.filter(user => user.id !== userId);
    writeUsersData(users);
}

// Get a user
function getUser(username, password) {
    const usersData = readUsersData();
    return usersData.users.find(user => user.username === username && user.password === password);
}

// Get the skills of a user
function getSkills(userId) {
    console.log("Getting skills for user with id: " + userId);
    const usersData = readUsersData();
    const user = usersData.users.find(user => user.id == userId);
    return user ? user.skills : null;
}

// Add a skill to a user
function addSkill(userId, skill) {
    const usersData = readUsersData();
    const user = usersData.users.find(user => user.id == userId);
    if (user) {
        user.skills.push(skill);
        writeUsersData(usersData);
    }
}

// Remove a skill from a user
function removeSkill(userId, skill) {
    const usersData = readUsersData();
    const user = usersData.users.find(user => user.id === userId);
    if (user) {
        user.skills = user.skills.filter(userSkill => userSkill !== skill);
        writeUsersData(usersData);
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
