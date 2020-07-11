$(() => {
  const displayUserInfo = async () => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    try {
      const { forename, email } = await $.get('/api/user_data');
      $('.member-name').text(forename);
      $('.member-email').text(email);
    } catch (err) {
      console.error(`ERROR - members.js: ${err}`);
    }
  };
  displayUserInfo();
});
