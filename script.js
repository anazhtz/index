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
const modalTitle = document.getElementById("modalTitle");

const userTableBody = document.getElementById("userTableBody");
const addBtn = document.getElementById("addBtn");

// Open modal for adding a new user
addBtn.addEventListener("click", () => {
    userForm.reset();
    modalTitle.textContent = "Add New User";
    userModal.style.display = "flex";
});

// Close modal
closeModal.addEventListener("click", () => {
    userModal.style.display = "none";
});

// Save new user or edit an existing user
userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = {
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
        const index = users.findIndex((u) => u.id === user.id);
        users[index] = user;
    } else {
        users.push(user);
    }

    renderUsers();
    userModal.style.display = "none";
});

// Render users in the table
function renderUsers() {
    userTableBody.innerHTML = "";
    users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.company}</td>
            <td>${user.designation}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td><a href="${user.linkedin}" target="_blank">Profile</a></td>
            <td>${user.bio}</td>
            <td>
                <button class="btn edit-btn" onclick="editUser('${user.id}')">Edit</button>
                <button class="btn delete-btn" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

// Edit user
function editUser(id) {
    const user = users.find((user) => user.id === id);
    userId.value = user.id;
    userName.value = user.name;
    userCompany.value = user.company;
    userDesignation.value = user.designation;
    userEmail.value = user.email;
    userPhone.value = user.phone;
    userLinkedin.value = user.linkedin;
    userBio.value = user.bio;
    modalTitle.textContent = "Edit User";
    userModal.style.display = "flex";
}

// Delete user
function deleteUser(id) {
    users = users.filter((user) => user.id !== id);
    renderUsers();
}

// Initial render
renderUsers();
