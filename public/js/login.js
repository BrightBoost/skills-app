document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", onSubmitLoginForm);
});

function onSubmitLoginForm(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageDiv = document.getElementById("message");

    fetch("/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                // Save the user to localStorage and redirect to the skillList page
                localStorage.setItem("currentUser", JSON.stringify(data.user));
                localStorage.setItem("sessionID", JSON.stringify(data.sessionID));
                window.location.href = "skillList.html";
            } else {
                // Show the error message
                messageDiv.textContent = data.message;
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}