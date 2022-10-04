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
	likedUsers();
	viewChatUsers();
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
				<div class="user flex column" onclick="showUser(${user.id})">
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
		const communityRest = await axios.post(`${baseURL}/show_rest`, form, {
			headers: {
				Authorization: `bearer ${localStorage.token}`
			}
		});
		communityRest.data.data.forEach((farUser) => {
			communityGrid.innerHTML += `
			<div>
				<div class="user flex column" onclick="showUser(${farUser.id})">
					<div class="user-image-container">
						<img src="${farUser.profile_url}" alt="">
					</div>
					<div class="user-content flex column">
						<h2 class="username">${farUser.name}</h2>
						<h3 class="user-location">${farUser.location}</h3>
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

const showUser = async (userId) => {
	const id = { id: userId };
	try {
		const userInfo = await axios.post(`${baseURL}/show_user`, id, {
			headers: {
				Authorization: `bearer ${localStorage.token}`
			}
		});
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
				<div class="user flex column" onclick="showUser(${user.id})">
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

const settings = async () => {
	const form = {
		id: localStorage.id,
		name: accountName.value,
		oldEmail: localStorage.email,
		email: accountEmail.value,
		location: accountLocation.value,
		bio: accountBio.value,
		password: accountPassword.value
	};
	try {
		const updateSettings = await axios.post(`${baseURL}/settings`, form, {
			headers: {
				Authorization: `bearer ${localStorage.token}`
			}
		});
		localStorage.setItem('name', accountName.value);
		localStorage.setItem('email', accountEmail.value);
		localStorage.setItem('password', accountPassword.value);
		localStorage.setItem('location', accountLocation.value);
		localStorage.setItem('bio', accountBio.value);
		window.location.reload();
	} catch (error) {
		console.log(error);
	}
};

saveButton.addEventListener('click', settings);

const logout = () => {
	localStorage.clear();
	window.location.href = 'index.html';
};

logoutButton.addEventListener('click', logout);

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
			<div class="user-chat-element flex pointer" onclick="viewChat(${user.id}, ${user.name})">
                <img src="${user.profile_url}" alt="profile">
                <h1>${user.name}</h1>
            </div>`;
		});
	} catch (error) {
		console.log(error);
	}
};

const viewChat = async (id, name) => {
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
			if (message.id == localStorage.id) {
				chatContainer.innerHTML += `
				<div class="my-message">${text.message}</div>`;
			} else {
				chatContainer.innerHTML += `
				<div class="user-message">${text.message}</div>`;
			}
		});
		chatTitle.innerHTML = name;
	} catch (error) {
		console.log(error);
	}
};

const sendMessage = async (id) => {
	const form = {
		user_id: localStorage.id,
		chatter_id: id,
		message: chatInput.value
	};
	try {
		const send = await axios.post(`${baseURL}/send_message`, form, {
			headers: {
				Authorization: `bearer ${localStorage.token}`
			}
		});
		chatContainer.innerHTML += `<div class="my-message">${send.data.data[0].message}</div>`;
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
