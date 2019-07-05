/**
 * Show error message on the page and in the console
 * @param identifier {string} - HTML identifier of the <div>
 * @param message {string} - message to show
 * @param err {object} - error object
 */
function showError(identifier, message, err = null) {
  $(`#${identifier}`).empty().append(`
<div class="error margin-top center">${message}</div>    
    `);
  return console.log(err);
}
