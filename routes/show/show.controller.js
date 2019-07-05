/**
 * Get parser results
 * @param req {object} - request object
 * @param res {object} - response object
 * @return {Promise<*>}
 */
async function getResults(req, res) {
  try {
    const message = {
      datetime: Date.now(),
      info: 'OK',
      status: 200,
    };
    return res.status(message.status).send(message);
  } catch (err) {
    const message = {
      datetime: Date.now(),
      error: err,
      info: 'INTERNAL_SERVER_ERROR',
      status: 500,
    };
    return res.status(message.status).send(message);
  }
}

module.exports = {
  getResults,
};
