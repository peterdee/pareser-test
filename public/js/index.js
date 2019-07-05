async function startParsing() {
  try {
    const results = await $.ajax({
      url: '/api/parse',
      method: 'GET',
    });
    clearIdentifier('results');
    clearIdentifier('error');
    console.log('> results', results);
  } catch (err) {
    return showError('error', 'Error loading results!', err);
  }
}

async function showResults() {
  try {
    showLoader('results');
    const results = await $.ajax({
      url: '/api/show',
      method: 'GET',
    });
    clearIdentifier('results');
    clearIdentifier('error');
    console.log('> results', results);
  } catch (err) {
    return showError('error', 'Error loading results!', err);
  }
}

/**
 * Show initial actions on page load
 */
function showActions() {
  $('#root').empty().append(`
<div class="flex-row flex-center">
  <button id="showResults">SHOW RESULTS</button>
  <button id="startParsing">START PARSING</button>
</div>
<div id="results"></div>
<div id="error"></div>
  `);

  // handle "SHOW RESULTS" click
  $('#showResults').on('click', () => {
    showLoader('results');
    return showResults();
  });

  // handle "START PARSING" click
  $('#startParsing').on('click', () => {
    showLoader('results');
    return startParsing();
  });
}

$(document).ready(() => {
  showActions();
});
