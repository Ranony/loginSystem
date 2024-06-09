let signUpNavigate = document.getElementById('signUpNavigate');
let signInNavigate = document.getElementById('signInNavigate');
let loginButton = document.getElementById('loginButton');
let loginEmail = document.getElementById('loginEmail');
let loginPassword = document.getElementById('loginPassword');
let signUpButton = document.getElementById('signUpButton');
let logoutButton = document.getElementById('logoutButton');
let registerName = document.getElementById('registerName');
let registerEmail = document.getElementById('registerEmail');
let registerPassword = document.getElementById('registerPassword');
let message = document.getElementById('message');
let userName = localStorage.getItem('loggedInUser');
let users = [];

//Local Storage
if (localStorage.getItem('allUsers') != null) {
    users = JSON.parse(localStorage.getItem('allUsers'));
}

//Navigate to sign up page
if (signUpNavigate) {
    signUpNavigate.addEventListener('click', function () {
        window.location.href = 'register.html';
    });
}

//Navigate to sign in page
if (signInNavigate) {
    signInNavigate.addEventListener('click', function () {
        window.location.href = 'index.html';
    });
}

// Navigate to sign in page from welcome page through logout button
if (logoutButton) {
    logoutButton.addEventListener('click', function () {
        window.location.href = 'index.html';
    });
}


//Adding new user <Sign Up>
if (signUpButton) {
    signUpButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (registerName.value !== "" && registerEmail.value !== "" && registerPassword.value !== "") {
            // Check if the email already exists
            if (isEmailExists(registerEmail.value)) {
                signUpValidation("email already exists");
            } else {
                let user = {
                    name: registerName.value,
                    email: registerEmail.value,
                    password: registerPassword.value,
                };
                users.push(user);
                localStorage.setItem('allUsers', JSON.stringify(users));
                localStorage.setItem('loggedInUser', user.name);
                signUpValidation("Success");
            }
        } else {
            signUpValidation("All inputs are required");
        }
    });
}

// Check if the email already exists
function isEmailExists(email) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return true; // Email exists
        }
    }
    return false; // Email does not exist
}

// Check if the password already exists
function isPasswordExists(password) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].password === password) {
            return true; // Password exists
        }
    }
    return false; // Password does not exist
}

// Sign up validation message
function signUpValidation(messageText) {
    message.textContent = messageText;
    message.classList.replace('d-none', 'd-block');
    if (messageText === 'All inputs are required' || messageText === 'email already exists' || messageText === 'Invalid email or password') {
        message.style.color = 'red';
    } else if (messageText === 'Success') {
        message.style.color = 'green';
    }
}


// Login and Navigate to the welcome page
if (loginButton) {
    loginButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (loginEmail.value !== "" && loginPassword.value !== "") {
            let users = JSON.parse(localStorage.getItem('allUsers')) || [];
            let user = users.find(u => u.email === loginEmail.value && u.password === loginPassword.value);
            if (user) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('loggedInUser', user.name);
                window.location.href = 'welcome.html';
            } else {
                signUpValidation("Invalid email or password");
            }
        } else {
            signUpValidation("All inputs are required");
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is logged in
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        displayWelcome();
    }
});

// Display the welcome page
function displayWelcome() {
    let cartona = "";
    cartona += `
        <div class="welcome text-info m-auto w-75 h-25 d-flex justify-content-center align-items-center">
            <h2 class="fs-1">Welcome ${userName}</h2>
        </div>
    `;
    document.getElementById('welcome').innerHTML = cartona;
}










