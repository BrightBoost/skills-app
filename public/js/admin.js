document.addEventListener('DOMContentLoaded', (event) => {
    const userSelect = document.getElementById('user-select');
    const newUserForm = document.getElementById('user-form');
    const newSkillForm = document.getElementById('skill-form');

    populateUserList(userSelect);


    // Fetch skills of the selected user and populate the skills list
    userSelect.addEventListener('change', (event) => {
        const userId = event.target.value;
        renderSkillsForUser(userId, userSelect);
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
    fetch('/api/admin/users', {
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
                option.value = user.id;
                option.text = user.username;
                userSelect.appendChild(option);
            });
        })
        .catch((error) => console.error('Error:', error));
}

function renderSkillsForUser(userId) {
    const skillsList = document.getElementById('skills-list');

    fetch(`/api/admin/user/${userId}/skills`, {
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

    fetch('/api/admin/users', {
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

    fetch(`/api/admin/user/${userSelect.value}/skills`, {
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


function logout(currentUser) {
    fetch("/api/user/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                localStorage.removeItem("currentUser");
                window.location.href = "main.html";
            } else {
                console.error("Error logging out:", data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}