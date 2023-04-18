// accessIndex page dropdown menu hover
$(document).ready(function(){
    var accountLink = document.querySelector('.nav-item.dropdown a.nav-link');
    var dropDownMenu = document.querySelector('.nav-item.dropdown .dropdown-menu');
    accountLink.addEventListener('mouseover', function() {
        dropDownMenu.classList.add('show');
    });

    // add an event listener to keep the drop-down menu open when hovering over it
    dropDownMenu.addEventListener('mouseover', function() {
        dropDownMenu.classList.add('show');
    });

    // add an event listener to hide the menu when the mouse leaves the link or menu
    accountLink.addEventListener('mouseout', function() {
        dropDownMenu.classList.remove('show');
    });
    dropDownMenu.addEventListener('mouseout', function() {
        dropDownMenu.classList.remove('show');
    });

});

function validateForm() {
    const usernameInput = document.getElementById('inputUsername');
    const passwordInput = document.getElementById('inputPassword');
    const confirmPasswordInput = document.getElementById('inputConfirmPassword');

    // Check if password and confirm password fields are empty and username is unchanged
    if ((passwordInput.value.trim() === '' || confirmPasswordInput.value.trim() === '') && usernameInput.defaultValue === usernameInput.value) {
        return false; // Prevent form submission
    }
    else if(passwordInput.value.trim() != confirmPasswordInput.value.trim())
    {
        alert("Password mismatch!");
        passwordInput.value = '';
        confirmPasswordInput.value = '';
        return false; // Prevent form submission
    }

    return true; // Allow form submission
}

