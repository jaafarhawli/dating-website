const users = document.querySelectorAll('.user');
const userModal = document.getElementById('userModal');
const userQuit = document.getElementById('userQuit');

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
