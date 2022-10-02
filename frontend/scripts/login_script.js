const loginLink = document.querySelector('.login-link');
const signupLink = document.querySelector('.signup-link');
const loginContainer = document.querySelector('.login-form-container');
const SignupContainer = document.querySelector('.signup-form-container');

// Display log in form
loginLink.addEventListener('click', () => {
	loginContainer.classList.remove('display');
	SignupContainer.classList.add('display');
	window.location.reload();
});

// Display sign up form
signupLink.addEventListener('click', () => {
	loginContainer.classList.add('display');
	SignupContainer.classList.remove('display');
});
