/**
 * Draw item card
 * @param array {array} - array of item objects
 * @param identifier {string} - identifier: where to append an item
 * @return {*}
 */
function drawCards(array, identifier) {
  return array.forEach((item) => {
    return $(`#${identifier}`).append(`
<div class="flex-row flex-start margin-bottom card pointer">
  <div class="image-card">
    <img class="image-card" src="${item.photo}" alt="${item.title}"/>
  </div>
  <div class="flex-column flex-start margin-left">
    <div><h1>${item.title}</h1></div>
    <div>${item.summary}</div>
  </div>
</div>
  `);
  });
}

/**
 * Show loaded results
 * @param data {object} - data object: { cars: [ARRAY], trucks: [ARRAY] }
 * @return {*}
 */
function showResults(data) {
  $('#results').empty().append(`
<div class="flex-column flex-start margin-top content">
  <div class="margin-bottom"><h1>CARS</h1></div>
  <div id="cars"></div>
  <div class="divider margin-bottom"></div>
  <div class="margin-bottom"><h1>TRUCKS</h1></div>
  <div id="trucks"></div>
</div>
  `);

  drawCards(data.cars, 'cars');
  drawCards(data.trucks, 'trucks');
}

/**
 * Load data
 */
async function getResults() {
  try {
    showLoader('results');
    const response = await $.ajax({
      url: '/api/show',
      method: 'GET',
    });
    clearIdentifier('results');
    clearIdentifier('error');
    return showResults(response.data);
  } catch (err) {
    return showError('error', 'Error loading results!', err);
  }
}

/**
 * Start parsing of the pages
 * @return {Promise<Promise<*|*|undefined>|void>}
 */
async function startParsing() {
  try {
    await $.ajax({
      url: '/api/parse',
      method: 'GET',
    });
    clearIdentifier('results');
    clearIdentifier('error');
    return getResults();
  } catch (err) {
    return showError('error', 'Parsing error!', err);
  }
}

/**
 * Show initial actions on page load
 */
function showActions() {
  $('#root').empty().append(`
<div class="flex-row flex-center">
  <button id="getResults">SHOW RESULTS</button>
  <button id="startParsing">START PARSING</button>
</div>
<div id="results"></div>
<div id="error"></div>
  `);

  // handle "SHOW RESULTS" click
  $('#getResults').on('click', () => {
    showLoader('results');
    return getResults();
  });

  // handle "START PARSING" click
  $('#startParsing').on('click', () => {
    showLoader('results');
    return startParsing();
  });
}

/**
 * Show initial actions on page load
 */
$(document).ready(() => {
  showActions();
});
