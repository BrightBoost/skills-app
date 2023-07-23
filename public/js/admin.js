document.addEventListener('DOMContentLoaded', (event) => {
    const userSelect = document.getElementById('user-select');
    const newUserForm = document.getElementById('user-form');
    const newSkillForm = document.getElementById('skill-form');

    populateUserList(userSelect);


    // Fetch skills of the selected user and populate the skills list
    userSelect.addEventListener('change', (event) => {
        const username = event.target.value;
        renderSkillsForUser(username, userSelect);
    });

    // Add event listener to the Add User form
    newUserForm.addEventListener('submit', (event) => {
        // Prevent the form from submitting normally
        event.preventDefault();
        addUser();
        populateUserList(userSelect);

    });

    // Add event listener to the Add Skill form
    newSkillForm.addEventListener('submit', (event) => {
        // Prevent the form from submitting normally
        event.preventDefault();
        addSkill(userSelect);
    });
});

function populateUserList(userSelect) {
    const usersList = document.getElementById('users-list');

    // Fetch users and populate the users list and user select
    fetch('http://localhost:3000/api/admin/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            usersList.innerHTML = "";
            userSelect.innerHTML = "";

            data.users.forEach((user) => {
                // populate the users list
                const listItem = document.createElement('li');
                listItem.textContent = user.username;
                usersList.appendChild(listItem);

                // populate the user select
                const option = document.createElement('option');
                option.value = user.username;
                option.text = user.username;
                userSelect.appendChild(option);
            });
        })
        .catch((error) => console.error('Error:', error));
}

function renderSkillsForUser(username) {
    const skillsList = document.getElementById('skills-list');

    fetch(`http://localhost:3000/api/admin/user/${username}/skills`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            // clear the skills list
            skillsList.innerHTML = '';

            data.skills.forEach((skill) => {
                const listItem = document.createElement('li');
                listItem.textContent = skill;
                skillsList.appendChild(listItem);
            });
        })
        .catch((error) => console.error('Error:', error));
}

function addUser() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    fetch('http://localhost:3000/api/admin/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('User added:', data);
            // Do something after user is added, like updating the users list and user select
        })
        .catch(error => console.error('Error:', error));

}

function addSkill(userSelect) {
    const skill = document.getElementById('new-skill').value;

    fetch(`http://localhost:3000/api/admin/user/${userSelect.value}/skills`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skill }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Skill added:', data);
            // Refresh the skills list
            renderSkillsForUser(userSelect.value);
            // Empty the input box
            document.getElementById('new-skill').value = "";
        })
        .catch(error => console.error('Error:', error));

}