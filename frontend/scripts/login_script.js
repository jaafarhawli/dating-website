const signupLink = document.querySelector('.signup-link');
const signinPageButton = document.getElementById('signinPageButton');
const email = document.getElementById('email');
const password = document.getElementById('password');
const loginUrl = 'http://127.0.0.1:8000/api/v0.1/login';

// Display sign up form
signupLink.addEventListener('click', () => {
	window.location.href = 'signup.html';
});
