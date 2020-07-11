// Event listener for removing a specific exercise from favourites
const favouriteBtn = $('.favourites-button');

favouriteBtn.on('click', async event => {
  event.preventDefault();
  const id = $(event.target).attr('data-id');

  try {
    if ($(event.target).attr('id') === 'remove-from-favourites') {
      await $.ajax({ url: `/api/fave-exercise/${id}`, type: 'DELETE' });
    } else {
      await $.post(`/api/fave-exercise/${id}`);
    }
    favouriteBtn.toggle();
  } catch (err) {
    console.error(`ERROR - results.js - star.on('click'): ${err}`);
  }
});
