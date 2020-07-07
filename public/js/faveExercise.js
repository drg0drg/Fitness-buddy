$(document).ready(() => {
  // Getting references to our form and inputs
  const logout = $('#footer-log-out');

  // When user clicks Logout, we send a get request for the /logout route
  logout.on('click', async event => {
    event.preventDefault();
    try {
      await $.get('/api/logout');

      // If there's an error, log the error
    } catch (err) {
      console.error(`ERROR - favourite-exe.js - logout: ${err}`);
      alert(`${err.status}: ${err.statusText}`);
    }
  });
});
