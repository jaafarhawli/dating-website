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

const privateYes = document.getElementById('privateYes');
const privateNo = document.getElementById('privateNo');

const communityGrid = document.getElementById('communityGrid');
const userModalInfo = document.getElementById('userModalInfo');
const likedGrid = document.getElementById('likedGrid');
const chatUsers = document.getElementById('chatUsers');
const chatContainer = document.getElementById('chatContainer');
const modalButtons = document.getElementById('modalButtons');
const saveButton = document.getElementById('saveButton');
const logoutButton = document.getElementById('logoutButton');
const chatTitle = document.getElementById('chatTitle');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
let currentUser;

const profileImageInput = document.getElementById('profileImageInput');
const submitImg = document.getElementById('submitImg');
const profilePic = document.getElementById('profilePic');
let base64String = '';
let imageChanged = false;

const notNullCommunityUsers = [];
const nullCommunityUsers = [];
const myLat = localStorage.latitude;
const myLong = localStorage.longitude;

const hamburger = document.querySelector('.hamburger');
const navItems = document.querySelector('.nav-elements');
const mainHeroHeader = document.querySelector('.main-hero-header');
const mainNav = document.querySelector('.main-navbar');

const chatHamburger = document.querySelector('.chat-hamburger');

const mainChat = document.querySelector('.main-chat');
const chatHam = document.getElementById('chatHamburger');

const baseURL = 'http://127.0.0.1:8000/api/v1';

// Default values in account settings
window.onload = () => {
	accountName.value = localStorage.name;
	accountEmail.value = localStorage.email;
	accountBio.value = localStorage.bio;
	accountLocation.value = localStorage.location;
	if (localStorage.private_account == 'no' || localStorage.private_account == 'No') {
		privateNo.checked = true;
	} else {
		privateYes.checked = true;
	}
	profilePic.src = localStorage.profile_url;
	viewAll();
	likedUsers();
	viewChatUsers();
};

function chatMenu() {
	const chatUser = document.querySelectorAll('.user-chat-element');
	chatUser.forEach((user) => user.classList.toggle('active'));
	chatUsers.classList.toggle('active');
	mainChat.classList.toggle('active');
}

// chatHamburger.addEventListener('click', () => {
// 	chatUser.forEach((user) => user.classList.toggle('active'));
// 	chatUsers.classList.toggle('active');
// 	mainChat.classList.toggle('active');
// });

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

// Quit modal
userQuit.addEventListener('click', () => {
	userModal.close();
	document.body.style.overflow = 'auto';
	document.body.style.userSelect = 'auto';
});

// View community users on page load, users will be shown from the nearest to the farthest based on geolocation
const viewAll = async () => {
	const form = {
		preferedGender: localStorage.prefered_gender,
		id: localStorage.id
	};
	try {
		const communityUsers = await axios.post(`${baseURL}/show_all`, form, {
			headers: {
				Authorization: `bearer ${localStorage.token}`
			}
		});
		// Get latitude and longitude of each user in the community users and calculate the distance with the logged in user, then display the users from the nearest to the farthest, users that have no geolocation will be displayed the last
		communityUsers.data.data.forEach((user) => {
			let userLatitude = user.latitude;
			let userLongitude = user.longitude;
			// If geolocation attributes are missing, add to null users array with the info needed to display the user
			if (userLatitude == null || userLongitude == null) {
				nullCommunityUsers.push([ user.id, user.profile_url, user.name, user.location ]);
				// Else calculate the distance and add it to the not null users array with the info needed to display the user
			} else {
				notNullCommunityUsers.push([
					Math.abs(user.latitude - myLat + (user.longitude - myLong)),
					user.id,
					user.profile_url,
					user.name,
					user.location
				]);
			}
		});
		// Sort the not null users array based on geolocation
		notNullCommunityUsers.sort(function(a, b) {
			return a[0] - b[0];
		});
		// Display users with known geolocation attributes first in order of distance
		notNullCommunityUsers.forEach((account) => {
			communityGrid.innerHTML += `
		 	<div>
		 		<div class="user flex column pointer" onclick="showUser(${account[1]})">
		 			<div class="user-image-container">
		 				<img src="${account[2]}" alt="">
		 			</div>
		 			<div class="user-content flex column">
		 				<h2 class="username">${account[3]}</h2>
		 				<h3 class="user-location">${account[4]}</h3>
		 			</div>
		 		</div>
		 	</div>`;
		});
		// Display the users with null geolocation attributes randomly after
		nullCommunityUsers.forEach((nullAccount) => {
			communityGrid.innerHTML += `
		 	<div>
		 		<div class="user flex column pointer" onclick="showUser(${nullAccount[0]})">
		 			<div class="user-image-container">
		 				<img src="${nullAccount[1]}" alt="">
		 			</div>
		 			<div class="user-content flex column">
		 				<h2 class="username">${nullAccount[2]}</h2>
		 				<h3 class="user-location">${nullAccount[3]}</h3>
		 			</div>
		 		</div>
		 	</div>`;
		});
		// Add a slider
		const communitySlider = tns({
			container: '.community-grid',
			slideBy: 1,
			speed: 400,
			nav: false,
			mouseDrag: true,
			controlsContainer: '#SwipeControls',
			prevButton: '.right',
			nextButton: '.left',
			gutter: 10,
			responsive: {
				1150: {
					items: 3
				},
				750: {
					items: 2
				},
				200: {
					items: 1
				}
			}
		});
	} catch (error) {
		console.log(error);
	}
};

// Show user modal when user is clicked
const showUser = async (userId) => {
	const id = { id: userId };
	try {
		const userInfo = await axios.post(`${baseURL}/show_user`, id, {
			headers: {
				Authorization: `bearer ${localStorage.token}`
			}
		});
		console.log(userInfo.data.data[0]);
		userModalInfo.innerHTML = `
				<img src="${userInfo.data.data[0].profile_url}" alt="user image" class="user-modal-image">
				<div class="user-details">
					<p class="user-modal-name bold">${userInfo.data.data[0].name}</p>
					<p class="user-modal-gender">${userInfo.data.data[0].gender}</p>
					<p class="user-modal-location bold">${userInfo.data.data[0].location}</p>
					<p class="user-modal-bio">${userInfo.data.data[0].bio}</p>
				</div>`;
		modalButtons.innerHTML = `
				<button type="button" class="favorite-modal-button button"  onclick="like(${userInfo.data.data[0]
					.id})">Like</button>
				<button type="button" class="text-modal-button button" onclick="message(${userInfo.data.data[0].id})">
					Text
				</button>
				<button type="button" class="block-modal-button button" onclick="block(${userInfo.data.data[0]
					.id})">Block</button>`;
		userModal.showModal();
		document.body.style.overflow = 'hidden';
		document.body.style.userSelect = 'none';
	} catch (error) {
		console.log(error);
	}
};

// Add user to liked list
const like = async (id) => {
	const form = {
		user_id: localStorage.id,
		liking_user_id: id
	};
	try {
		const likeUser = await axios.post(`${baseURL}/like`, form, {
			headers: {
				Authorization: `bearer ${localStorage.token}`
			}
		});
		window.location.reload();
	} catch (error) {
		console.log(error);
	}
};

// Add user to blocked list
const block = async (id) => {
	const form = {
		blocking_user_id: localStorage.id,
		blocked_user_id: id
	};
	try {
		const blockUser = await axios.post(`${baseURL}/block`, form, {
			headers: {
				Authorization: `bearer ${localStorage.token}`
			}
		});
		window.location.reload();
	} catch (error) {
		console.log(error);
	}
};

// View liked users list
const likedUsers = async () => {
	const form = {
		user_id: localStorage.id
	};
	try {
		const viewLiked = await axios.post(`${baseURL}/view_likes`, form, {
			headers: {
				Authorization: `bearer ${localStorage.token}`
			}
		});
		viewLiked.data.data.forEach((user) => {
			likedGrid.innerHTML += `
			<div>
				<div class="user flex column pointer" onclick="showUser(${user.id})">
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
	} catch (error) {
		console.log(error);
	}
};

// Save new profile attributes in the database and update local storage
const settings = async () => {
	let accountPrivate = document.querySelector('input[name="private"]:checked');
	const form = {
		id: localStorage.id,
		name: accountName.value,
		oldEmail: localStorage.email,
		email: accountEmail.value,
		location: accountLocation.value,
		bio: accountBio.value,
		private: accountPrivate.value
	};
	try {
		const updateSettings = await axios.post(`${baseURL}/settings`, form, {
			headers: {
				Authorization: `bearer ${localStorage.token}`
			}
		});
		if (imageChanged == true) {
			uploadImage();
			imageChanged = false;
		}

		if (accountPassword.value.length >= 8) {
			console.log(accountPassword.value.length);
			updatePassword();
		}
		localStorage.setItem('name', accountName.value);
		localStorage.setItem('email', accountEmail.value);
		localStorage.setItem('location', accountLocation.value);
		localStorage.setItem('bio', accountBio.value);
		localStorage.setItem('private_account', accountPrivate.value);
	} catch (error) {
		console.log(error);
	}
};

saveButton.addEventListener('click', settings);

// Logout, clear local storage and reload to the landing page
const logout = () => {
	localStorage.clear();
	window.location.reload();
	window.location.href = 'index.html';
};

logoutButton.addEventListener('click', logout);

// View all users that the current user had sent to or received any message from (except users blocking current user or blocked by him)
const viewChatUsers = async () => {
	const form = {
		user_id: localStorage.id
	};
	try {
		const viewUsers = await axios.post(`${baseURL}/view_chat_users`, form, {
			headers: {
				Authorization: `bearer ${localStorage.token}`
			}
		});
		viewUsers.data.data.forEach((user) => {
			chatUsers.innerHTML += `
			<div class="user-chat-element flex pointer" onclick="viewChat(${user.id})">
                <img src="${user.profile_url}" alt="profile">
                <h1>${user.name}</h1>
            </div>`;
		});
	} catch (error) {
		console.log(error);
	}
};

// View chat with the selected user
const viewChat = async (id) => {
	currentUser = id;
	chatContainer.innerHTML = '';
	const form = {
		user_id: localStorage.id,
		chatter_id: id
	};
	try {
		const viewChat = await axios.post(`${baseURL}/view_chat`, form, {
			headers: {
				Authorization: `bearer ${localStorage.token}`
			}
		});

		viewChat.data.data.forEach((text) => {
			if (text.sender_user_id == localStorage.id) {
				chatContainer.innerHTML += `
				<div class="my-message">${text.message}</div>`;
			} else {
				chatContainer.innerHTML += `
				<div class="user-message">${text.message}</div>`;
			}
		});
		const formId = { id: currentUser };
		const showName = await axios.post(`${baseURL}/show_user`, formId, {
			headers: {
				Authorization: `bearer ${localStorage.token}`
			}
		});
		chatTitle.innerHTML = showName.data.data[0].name;
	} catch (error) {
		console.log(error);
	}
};

// Send message to selected user
const sendMessage = async () => {
	const form = {
		user_id: localStorage.id,
		chatter_id: currentUser,
		message: chatInput.value
	};
	try {
		const send = await axios.post(`${baseURL}/send_message`, form, {
			headers: {
				Authorization: `bearer ${localStorage.token}`
			}
		});
		chatContainer.innerHTML += `<div class="my-message">${chatInput.value}</div>`;
		chatInput.value = '';
	} catch (error) {
		console.log(error);
	}
};

sendButton.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		sendMessage();
	}
});

// When text button inside user modal is clicked, go to chat page and open chat with that user
const message = (id) => {
	viewChat(id);
	userModal.close();
	document.body.style.overflow = 'auto';
	document.body.style.userSelect = 'auto';

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
};

// Save base64 value of the new uploaded profile
function imageUploaded() {
	const file = document.querySelector('input[type=file]')['files'][0];

	const reader = new FileReader();

	reader.onload = function() {
		base64String = reader.result;
	};
	reader.readAsDataURL(file);
	imageChanged = true;
}

// Upload the new profile to the database and add it to local storage
const uploadImage = async () => {
	let form = {
		profilePicture: base64String,
		id: localStorage.id
	};
	const updateImage = await axios.post(`${baseURL}/update_profile`, form, {
		headers: {
			Authorization: `bearer ${localStorage.token}`
		}
	});
	profilePic.src = updateImage.data.url;
	localStorage.setItem('profile_url', updateImage.data.url);
};

profileImageInput.addEventListener('change', imageUploaded);

// Update the password when user inserts a new password with length greater than or equal to 8 characters
const updatePassword = async () => {
	console.log('hi');
	let form = {
		id: localStorage.id,
		password: accountPassword.value
	};
	const updatePassword = await axios.post(`${baseURL}/update_password`, form, {
		headers: {
			Authorization: `bearer ${localStorage.token}`
		}
	});
};

hamburger.addEventListener('click', () => {
	navItems.classList.toggle('active');
	mainNav.classList.toggle('active');
	mainHeroHeader.classList.toggle('active');
});
