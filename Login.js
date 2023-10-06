const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name-input');
    const passwordInput = document.getElementById('password-input');
    const password = passwordInput.value;
    const regex = /.{8,}$/;

    if (nameInput.value.trim() === '') {
        alert('Username cannot be empty.');
    } else if (password.length === 0) {
        alert('Password cannot be empty.');
    } else if (!regex.test(password)) {
        alert('Password is not strong enough.');
    } else {
        alert('Registration successful!');
        window.location.href = 'index.html';
    }
});
