document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const logoutButton = document.getElementById("logout");

    if (!currentUser) {
        // If no user is logged in, redirect to the login page
        window.location.href = "main.html";
        return;
    }

    // Handle logout
    logoutButton.addEventListener("click", () => logout(currentUser));

    // Handle skill list page
    if (window.location.pathname.endsWith("skillList.html")) {
        renderSkillListPage();
    }

    // Handle add skill page
    if (window.location.pathname.endsWith("skillForm.html")) {

        const addSkillForm = document.getElementById("add-skill-form");

        addSkillForm.addEventListener("submit", (event) => {
            event.preventDefault(); 
            addSkill(currentUser);
        });
    }

    updateNavbar();
});

function logout(currentUser) {
    fetch("http://localhost:3000/api/user/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: currentUser.username })
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

function addSkill(currentUser) {

    const messageDiv = document.getElementById("message");
    const skillName = document.getElementById("skill-name").value;

    fetch("http://localhost:3000/api/user/skills", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: currentUser.username, skill: skillName })
    })
        .then(response => {
            if (!response.ok) { // if HTTP-status is 200-299
                // get the error message from the body or default to response statusText
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === "success") {
                messageDiv.textContent = "Skill added successfully!";
            } else {
                messageDiv.textContent = data.message;
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function renderSkillListPage() {
    const skillsList = document.getElementById("skills-list");

    // Get username from local storage
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        let username = user.username;

        fetch(`http://localhost:3000/api/user/${username}/skills`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    data.skills.forEach(skill => {
                        const listItem = document.createElement("li");
                        listItem.textContent = skill;
                        skillsList.appendChild(listItem);
                    });
                } else {
                    console.error("Error getting skills:", data.message);
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    } else {
        console.error("No user is logged in.");
    }
}
function updateNavbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const navbar = document.getElementById('navbar');

    if (user && user.isAdmin) {
        const adminLink = document.createElement('a');
        adminLink.href = 'admin.html'; // Set the correct link to your admin page
        adminLink.textContent = 'Admin Page';
        navbar.appendChild(adminLink);
    }
}