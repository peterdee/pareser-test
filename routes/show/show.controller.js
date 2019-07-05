const db = require('../../db');

/**
 * Get parser results
 * @param req {object} - request object
 * @param res {object} - response object
 * @return {Promise<*>}
 */
async function getResults(req, res) {
  try {
    // load cars and trucks
    const [cars, trucks] = await Promise.all([
      db.Cars.findAll({
        order: [['createdAt', 'DESC']],
      }),
      db.Trucks.findAll({
        order: [['createdAt', 'DESC']],
      }),
    ]);

    // send response
    const message = {
      data: {
        cars,
        trucks,
      },
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
