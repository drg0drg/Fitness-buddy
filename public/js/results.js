// Event listener to add or remove an exercise from favourites
const star = $('h3>.fa-star');

star.on('click', async event => {
  event.preventDefault();
  const id = $(event.target)
    .parent()
    .attr('data-id');

  try {
    if ($(event.target).attr('class') === 'fa fa-star') {
      await $.ajax({ url: `/api/fave-exercise/${id}`, type: 'DELETE' });
      $(event.target).attr('class', 'far fa-star');
    } else {
      await $.post(`/api/fave-exercise/${id}`);
      $(event.target).attr('class', 'fa fa-star');
    }
  } catch (err) {
    console.error(`ERROR - results.js - star.on('click'): ${err}`);
  }
});
