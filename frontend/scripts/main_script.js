const users = document.querySelectorAll('.user');
const userModal = document.getElementById('userModal');
const userQuit = document.getElementById('userQuit');

// Switch between pages
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
