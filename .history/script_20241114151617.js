let users = [];

// Modal and form elements
const userModal = document.getElementById("userModal");
const closeModal = document.getElementById("closeModal");
const userForm = document.getElementById("userForm");

// Add/Edit user fields
const userName = document.getElementById("userName");
const userCompany = document.getElementById("userCompany");
const userDesignation = document.getElementById("userDesignation");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");
const userLinkedin = document.getElementById("userLinkedin");
const userBio = document.getElementById("userBio");
const userId = document.getElementById("userId");

// User list container
const userList = document.querySelector(".user-list");

// Open modal to add a new user
document.getElementById("addBtn").addEventListener("click", () => {
    document.getElementById("modalTitle").textContent = "Add New User";
    userForm.reset();
    userId.value = '';
    userModal.style.display = "flex";
});

// Close modal
closeModal.addEventListener("click", () => {
    userModal.style.display = "none";
});

// Handle user form submission (Add/Edit)
userForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newUser = {
        id: userId.value || Date.now().toString(),
        name: userName.value,
        company: userCompany.value,
        designation: userDesignation.value,
        email: userEmail.value,
        phone: userPhone.value,
        linkedin: userLinkedin.value,
        bio: userBio.value
    };

    if (userId.value) {
        // Update existing user
        const index = users.findIndex(user => user.id === userId.value);
        users[index] = newUser;
    } else {
        // Add new user
        users.push(newUser);
    }

    renderUsers();
    userModal.style.display = "none";
});

// Edit user
function editUser(userId) {
    const user = users.find(u => u.id === userId);
    userName.value = user.name;
    userCompany.value = user.company;
    userDesignation.value = user.designation;
    userEmail.value = user.email;
    userPhone.value = user.phone;
    userLinkedin.value = user.linkedin;
    userBio.value = user.bio;
    document.getElementById("modalTitle").textContent = "Edit User";
    userId.value = user.id;
    userModal.style.display = "flex";
}

// Delete user
function deleteUser(userId) {
    users = users.filter(user => user.id !== userId);
    renderUsers();
}

// Render user list
function renderUsers() {
    userList.innerHTML = '';
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Company:</strong> ${user.company}</p>
            <p><strong>Designation:</strong> ${user.designation}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>LinkedIn:</strong> <a href="${user.linkedin}" target="_blank">Profile</a></p>
            <p><strong>Bio:</strong> ${user.bio}</p>
            <button class="edit-btn" onclick="editUser('${user.id}')">Edit</button>
            <button class="delete-btn" onclick="deleteUser('${user.id}')">Delete</button>
        `;
        userList.appendChild(userCard);
    });
}

// Initial render
renderUsers();
