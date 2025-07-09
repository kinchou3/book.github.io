// User accounts storage (in a real app, this would be a database)
let users = JSON.parse(localStorage.getItem('bookHavenUsers')) || [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkLoggedInStatus();

    // Book Preview Functionality (existing code)
    if (document.querySelector('.book-view')) {
        // ... (keep your existing book preview code)
    }

    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Register Form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegistration();
        });
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });
    }
});

// Login Function
function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const rememberMe = document.querySelector('#login-form input[name="remember"]').checked;

    // Validation
    if (!email || !password) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store login status
        if (rememberMe) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
        } else {
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        }
        
        showAlert('Login successful!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showAlert('Invalid email or password', 'error');
    }
}

// Registration Function
function handleRegistration() {
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    const termsAccepted = document.querySelector('#register-form input[name="terms"]').checked;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
    }

    if (!termsAccepted) {
        showAlert('You must accept the terms and conditions', 'error');
        return;
    }

    // Check if user already exists
    if (users.some(u => u.email === email)) {
        showAlert('Email already registered', 'error');
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        joinedDate: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('bookHavenUsers', JSON.stringify(users));
    
    showAlert('Registration successful! You can now login.', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

// Check Login Status
function checkLoggedInStatus() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || 
                         JSON.parse(sessionStorage.getItem('loggedInUser'));
    
    if (loggedInUser) {
        // Update UI for logged in user
        const loginLinks = document.querySelectorAll('.login-btn');
        loginLinks.forEach(link => {
            link.innerHTML = `Welcome, ${loggedInUser.name.split(' ')[0]}`;
            link.href = '#';
            link.classList.add('logged-in');
            link.id = 'logout-btn';
        });
    }
}

// Show Alert Message
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) existingAlert.remove();

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type}`;
    alertDiv.textContent = message;
    
    // Insert alert in the appropriate form
    const forms = document.querySelectorAll('#login-form, #register-form');
    forms.forEach(form => {
        if (form) {
            form.insertBefore(alertDiv, form.firstChild);
        }
    });

    // Auto remove after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}
// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌓';
    themeToggle.title = 'Toggle Dark/Light Mode';
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '☀️';
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '🌓';
        }
    });
    
    // Rest of your existing code...
});