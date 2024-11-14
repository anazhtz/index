const users = [];
let editIndex = -1;

const addBtn = document.getElementById('addBtn');
const userCards = document.getElementById('userCards');
const userModal = document.getElementById('userModal');
const closeModal = document.getElementById('closeModal');
const userForm = document.getElementById('userForm');
const userId = document.getElementById('userId');
const userName = document.getElementById('userName');
const userCompany = document.getElementById('userCompany');
const userDesignation = document.getElementById('userDesignation');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');
const userLinkedin = document.getElementById('userLinkedin');
const userBio = document.getElementById('userBio');

// Open the user form for adding a new user
addBtn.addEventListener('click', () => {
    userModal.style.display = 'flex';
    userForm.reset();
    editIndex = -1;
    document.getElementById('modalTitle').textContent = 'Add New User';
});

// Close the modal
closeModal.addEventListener('click', () => {
    userModal.style.display = 'none';
});

// Handle form submission for saving user data
userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newUser = {
        id: userId.value || Date.now(),
        name: userName.value,
        company: userCompany.value,
        designation: userDesignation.value,
        email: userEmail.value,
        phone: userPhone.value,
        linkedin: userLinkedin.value,
        bio: userBio.value,
    };

    if (editIndex === -1) {
        users.push(newUser);
    } else {
        users[editIndex] = newUser;
    }

    userModal.style.display = 'none';
    renderUsers();
});

// Render all users as cards
function renderUsers() {
    userCards.innerHTML = '';

    users.forEach((user, index) => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');

        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Company:</strong> ${user.company}</p>
            <p><strong>Designation:</strong> ${user.designation}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>LinkedIn:</strong> <a href="${user.linkedin}" target="_blank">${user.linkedin}</a></p>
            <p><strong>Bio:</strong> ${user.bio}</p>
            <a href="#" class="btn" onclick="editUser(${index})">Edit</a>
            <a href="#" class="btn" onclick="deleteUser(${index})">Delete</a>
        `;
        userCards.appendChild(userCard);
}

// Edit user data
function editUser(index) {
    const user = users[index];
    userId.value = user.id;
    userName.value = user.name;
    userCompany.value = user.company;
    userDesignation.value = user.designation;
    userEmail.value = user.email;
    userPhone.value = user.phone;
    userLinkedin.value = user.linkedin;
    userBio.value = user.bio;

    editIndex = index;
    document.getElementById('modalTitle').textContent = 'Edit User';
    userModal.style.display = 'flex';
}

// Delete user
function deleteUser(index) {
    users.splice(index, 1);
    renderUsers();
}

renderUsers();
