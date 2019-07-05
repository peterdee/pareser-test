const { parse: HTMLParser } = require('node-html-parser');
const request = require('request');

const db = require('../../db');

// parsing sources
const carsSource = 'https://www.nydailynews.com/autos/types/sports-car';
const trucksSource = 'https://www.nydailynews.com/autos/types/truck';

/**
 * Create content request (promise that loads page content)
 * @param link {string} - source link
 * @return {Promise<any>}
 */
function createContentRequest(link) {
  return new Promise((resolve, reject) => {
    return request(link, (err, response, body) => {
      if (err) return reject(err);
      return resolve(body);
    });
  });
}

/**
 * Handle records: store new parsing records, drop old ones
 * @param req {object} - request object
 * @param res {object} - response object
 * @param page {object} - page object
 * @param table {string} - table name ("Cars", "Trucks")
 * @return {Promise<*|null|Promise<[*]>>}
 */
async function handleRecords(req, res, page, table) {
  try {
    // get all of the necessary HTML elements
    const root = HTMLParser(page);
    const entries = root.querySelectorAll('a.rt');
    if (!(Array.isArray(entries) && entries.length > 0)) {
      return null;
    }

    // construct database records
    const records = entries.map(entry => ({
        title: entry.querySelector('h3.rt-h').innerHTML || '',
        link: entry.rawAttributes.href,
        photo: `https://${entry.querySelector('img.rt-src').rawAttrs.split('//')[1].split('\'')[0]}`,
        summary: entry.querySelector('p.description').innerHTML || '',
    }));
    if (!(Array.isArray(records) && records.length > 0)) {
      return null;
    }

    // delete old records, store new ones
    const promises = records.map(record => db[table].create(record));
    await db[table].destroy({
      truncate: true,
    });
    return Promise.all(promises);
  } catch (err) {
    const message = {
      datetime: Date.now(),
      error: 'PARSING_ERROR',
      info: 'PARSING_ERROR',
      status: 500,
    };
    return res.status(message.status).send(message);
  }
}

/**
 * Start parsings
 * @param req {object} - request object
 * @param res {object} - response object
 * @return {Promise<*>}
 */
async function startParsing(req, res) {
  try {
    // create requests
    const carsPromise = createContentRequest(carsSource);
    const trucksPromise = createContentRequest(trucksSource);

    // make sure that parsing errors are handled
    const promised = [carsPromise, trucksPromise].map(async (promise) => {
      try {
        return await promise;
      } catch (err) {
        return null;
      }
    });

    // resolve everything, check content
    const [carsPage, trucksPage] = await Promise.all(promised);
    if (!carsPage && !trucksPage) {
      const message = {
        datetime: Date.now(),
        error: 'PARSING_ERROR',
        info: 'PARSING_ERROR',
        status: 500,
      };
      return res.status(message.status).send(message);
    }

    // start actual parsing
    await Promise.all([
      handleRecords(req, res, carsPage, 'Cars'),
      handleRecords(req, res, trucksPage, 'Trucks'),
    ]);

    // send response to the frontend
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
  startParsing,
};
