const loginButton = document.querySelector('.login-button');
const createAccount = document.querySelector('.create-account');

// jQuery: change Hero header opacity on scroll
$(document).ready(function() {
	$(window).scroll(function(event) {
		let scroll = $(this).scrollTop();
		let opacity = 1 - scroll / 500;
		if (opacity >= 0) {
			$('#heroHeader').css('opacity', opacity);
		}
	});
});

// Font Awesome: Reviews slider
const slider = tns({
	container: '.reviews',
	slideBy: 1,
	speed: 400,
	nav: false,
	mouseDrag: true,
	controls: false,
	autoplay: true,
	autoplayButtonOutput: false,
	autoplayTimeout: 3000,
	items: 3
});

loginButton.addEventListener('click', () => {
	window.location.href = 'login.html';
});

createAccount.addEventListener('click', () => {
	window.location.href = 'signup.html';
});
