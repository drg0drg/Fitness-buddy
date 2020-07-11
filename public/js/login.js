$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $('form.login');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');
  const alertMessage = $('#alert-user');
  const privacyCheckbox = $('#privacy-checkbox');

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on('submit', event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    // Check if the user has entered both an email and password
    if (!userData.email || !userData.password) {
      alertMessage
        .hide(300)
        .text('Enter your email and password')
        .show(300);
      return;
    }

    // Check if the user has checked the privacy policy agreement checkbox
    // If the user has not checked the privacy policy agreement checkbox, display message
    if (!privacyCheckbox.is(':checked')) {
      alertMessage
        .hide(300)
        .text('You must agree to the privacy policy')
        .show(300);
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);

    emailInput.val('');
    passwordInput.val('');
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  const loginUser = async (email, password) => {
    try {
      await $.post('/api/login', {
        email: email,
        password: password
      });

      window.location.replace('/?isInitialLogin=true');
      // If there's an error, log the error
    } catch (err) {
      console.error(`ERROR - login.js - loginUser(): ${err}`);
      alert(`${err.status}: ${err.statusText}`);
    }
  };
});
