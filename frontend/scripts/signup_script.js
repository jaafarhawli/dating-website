const loginLink = document.querySelector('.login-link');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const gender = document.getElementById('gender');
const userLocation = document.getElementById('location');
const preferedGender = document.getElementById('preferedGender');
const signupPageButton = document.getElementById('signupPageButton');
const signupUrl = 'http://127.0.0.1:8000/api/v1/register';

let latitudeVal;
let longitudeVal;

// Display log in form
loginLink.addEventListener('click', () => {
	window.location.href = 'login.html';
});

const getLocation = async () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(savePosition);
	} else {
		x.innerHTML = 'Geolocation is not supported by this browser.';
	}
};

function savePosition(position) {
	latitudeVal = position.coords.latitude;
	longitudeVal = position.coords.longitude;
	register();
}

// Register
const register = async () => {
	const form = {
		name: username.value,
		email: email.value,
		password: password.value,
		location: userLocation.value,
		gender: gender.value,
		prefered_gender: preferedGender.value,
		latitude: latitudeVal,
		longitude: longitudeVal
	};
	try {
		await axios.post(signupUrl, form);
		window.location.href = 'login.html';
	} catch (error) {
		console.log(error);
	}
};

signupPageButton.addEventListener('click', getLocation);
