/**
 * Show loader
 * @param identifier {string} - identifier of the loader placement
 * @return {ServerResponse|void|*|jQuery}
 */
function showLoader(identifier) {
  return $(`#${identifier}`).empty().append(`
<div class="flex-row flex-center width100">
  <img src="../images/loader.gif" alt="Loading..."/>
</div>
  `);
}

/**
 * Clear specified identifier
 * @param identifier {string} - identifier to be cleansed
 * @return {void | * | jQuery}
 */
function clearIdentifier(identifier) {
  return $(`#${identifier}`).empty();
}
