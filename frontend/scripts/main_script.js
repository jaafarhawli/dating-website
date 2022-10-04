const users = document.querySelectorAll('.user');
const userModal = document.getElementById('userModal');
const userQuit = document.getElementById('userQuit');

// Nav elements
const navHome = document.getElementById('navHome');
const navLiked = document.getElementById('navLiked');
const navChat = document.getElementById('navChat');
const accountButton = document.getElementById('accountButton');

// Page elements
const mainHero = document.getElementById('mainHero');
const likedHero = document.getElementById('likedHero');
const community = document.getElementById('community');
const liked = document.getElementById('liked');
const chat = document.getElementById('chat');
const account = document.getElementById('account');
const footer = document.getElementById('footer');

// Account Settings
const accountName = document.getElementById('accountName');
const accountEmail = document.getElementById('accountEmail');
const accountPassword = document.getElementById('accountPassword');
const accountLocation = document.getElementById('accountLocation');
const accountBio = document.getElementById('accountBio');
const accountGender = document.getElementById('gender');
const accountPreferedGender = document.getElementById('preferedGender');

const communityGrid = document.getElementById('communityGrid');

const baseURL = 'http://127.0.0.1:8000/api/v0.1';

// Default values in account settings
window.onload = () => {
	accountName.value = localStorage.name;
	accountEmail.value = localStorage.email;
	accountPassword.value = localStorage.password;
	accountBio.value = localStorage.bio;
	accountGender.value = localStorage.gender;
	accountPreferedGender.value = localStorage.prefered_gender;
	accountLocation.value = localStorage.location;
	viewCommunity();
	// console.log(localStorage.location);
};

// Switch between pages
// Home navbar element
navHome.addEventListener('click', () => {
	mainHero.classList.remove('display');
	likedHero.classList.add('display');
	community.classList.remove('display');
	footer.classList.remove('display');
	liked.classList.add('display');
	chat.classList.add('display');
	account.classList.add('display');
	navChat.classList.remove('current');
	navLiked.classList.remove('current');
	navHome.classList.add('current');
});

// Liked navbar element
navLiked.addEventListener('click', () => {
	mainHero.classList.add('display');
	likedHero.classList.remove('display');
	community.classList.add('display');
	footer.classList.remove('display');
	liked.classList.remove('display');
	chat.classList.add('display');
	account.classList.add('display');
	navChat.classList.remove('current');
	navLiked.classList.add('current');
	navHome.classList.remove('current');
});

// Chat navbar element
navChat.addEventListener('click', () => {
	mainHero.classList.add('display');
	likedHero.classList.remove('display');
	community.classList.add('display');
	footer.classList.add('display');
	liked.classList.add('display');
	chat.classList.remove('display');
	account.classList.add('display');
	navChat.classList.add('current');
	navLiked.classList.remove('current');
	navHome.classList.remove('current');
});

// Account navbar element
accountButton.addEventListener('click', () => {
	mainHero.classList.add('display');
	likedHero.classList.remove('display');
	community.classList.add('display');
	footer.classList.add('display');
	liked.classList.add('display');
	chat.classList.add('display');
	account.classList.remove('display');
	navChat.classList.remove('current');
	navLiked.classList.remove('current');
	navHome.classList.remove('current');
});

users[0].addEventListener('click', () => {
	userModal.showModal();
	document.body.style.overflow = 'hidden';
	document.body.style.userSelect = 'none';
});

userQuit.addEventListener('click', () => {
	userModal.close();
	document.body.style.overflow = 'auto';
	document.body.style.userSelect = 'auto';
});

const viewCommunity = async () => {
	const form = {
		location: localStorage.location,
		preferedGender: localStorage.prefered_gender,
		id: localStorage.id
	};
	try {
		const communityNearby = await axios.post(`${baseURL}/show_nearby`, form, {
			headers: {
				Authorization: `bearer ${localStorage.token}`
			}
		});
		communityNearby.data.data.forEach((user) => {
			communityGrid.innerHTML += `
			<div>
				<div class="user flex column">
					<div class="user-image-container">
						<img src="${user.profile_url}" alt="">
					</div>
					<div class="user-content flex column">
						<h2 class="username">${user.name}</h2>
						<h3 class="user-location">${user.location}</h3>
					</div>
				</div>
			</div>`;
		});
		// Community section slider
		const communitySlider = tns({
			container: '.community-grid',
			slideBy: 1,
			speed: 400,
			nav: false,
			controlsContainer: '#SwipeControls',
			prevButton: '.right',
			nextButton: '.left',
			gutter: 10,
			items: 3
		});
	} catch (error) {
		console.log(error);
	}
};
