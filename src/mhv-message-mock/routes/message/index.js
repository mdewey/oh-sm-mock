const { logger } = require('../../../logger');

const { buildResponse, openJsonFile } = require('../../../utils');

const ROUTES = {
  message: {
    name: 'POST create new message without attachment',
    pathParameters: {},
    callback(request) {
      logger.info({ request }, 'POST create new message without attachment');
      if (request.method !== 'POST') {
        return buildResponse({
          data: { error: 'Method not allowed' },
          statusCode: 405,
        });
      }
      const data = openJsonFile('mhv-message-mock', 'message', 'default');
      return buildResponse({ data });
    },
  },
};

module.exports = ROUTES;
