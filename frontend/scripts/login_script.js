const signupLink = document.querySelector('.signup-link');
const signinPageButton = document.getElementById('signinPageButton');
const email = document.getElementById('email');
const password = document.getElementById('password');
const loginUrl = 'http://127.0.0.1:8000/api/v1/login';
const infoUrl = 'http://127.0.0.1:8000/api/v1/account_info';

// Display sign up form
signupLink.addEventListener('click', () => {
	window.location.href = 'signup.html';
});

// login
const login = async () => {
	const form = {
		email: email.value,
		password: password.value
	};
	try {
		const res = await axios.post(loginUrl, form);
		if (res) {
			const emailInput = {
				email: email.value
			};
			const info = await axios.post(infoUrl, emailInput, {
				headers: {
					Authorization: `bearer ${res.data.access_token}`
				}
			});
			localStorage.setItem('token', res.data.access_token);
			localStorage.setItem('id', info.data.data[0].id);
			localStorage.setItem('name', info.data.data[0].name);
			localStorage.setItem('email', info.data.data[0].email);
			localStorage.setItem('location', info.data.data[0].location);
			localStorage.setItem('gender', info.data.data[0].gender);
			localStorage.setItem('prefered_gender', info.data.data[0].prefered_gender);
			localStorage.setItem('bio', info.data.data[0].bio);
			localStorage.setItem('profile_url', info.data.data[0].profile_url);
			localStorage.setItem('private_account', info.data.data[0].private_account);
			localStorage.setItem('latitude', info.data.data[0].latitude);
			localStorage.setItem('longitude', info.data.data[0].longitude);
			window.location.href = 'main.html';
		}
	} catch (error) {
		console.log(error);
	}
};

signinPageButton.addEventListener('click', login);
