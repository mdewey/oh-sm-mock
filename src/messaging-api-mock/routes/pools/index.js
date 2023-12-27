const { logger } = require('../../../logger');

const {
  buildResponse,
  PARAMS,
  PARAM_DICTIONARY,
  openJsonFile,
} = require('../../../utils');

const ROUTES = {
  '{authority}/pools': {
    name: 'Get pools',
    pathParameters: {
      [PARAMS.BASE_AUTHORITY]: PARAM_DICTIONARY[PARAMS.BASE_AUTHORITY],
      [PARAMS.AUTHORITY]: PARAM_DICTIONARY[PARAMS.AUTHORITY],
    },
    callback(request) {
      logger.info({ request }, 'GET pools');
      if (request.method !== 'GET') {
        return buildResponse({
          data: { error: 'Method not allowed' },
          statusCode: 405,
        });
      }
      const data = openJsonFile('messaging-api-mock','pools/get-pools', 'default');
      return buildResponse({ data });
    },
  },
  '{authority}/pools/{poolIds}': {
    name: 'Get pool',
    pathParameters: {
      [PARAMS.BASE_AUTHORITY]: PARAM_DICTIONARY[PARAMS.BASE_AUTHORITY],
      [PARAMS.AUTHORITY]: PARAM_DICTIONARY[PARAMS.AUTHORITY],
      [PARAMS.POOL_ID]: PARAM_DICTIONARY[PARAMS.POOL_ID],
    },
    callback(request) {
      logger.info({ request }, 'GET pool');
      if (request.method !== 'GET') {
        return buildResponse({
          data: { error: 'Method not allowed' },
          statusCode: 405,
        });
      }
      const data = openJsonFile('messaging-api-mock','pools/get-pools-by-id', 'default');
      return buildResponse({ data });
    },
  },
  '{authority}/pools/{poolIds}/recipient-access': {
    name: 'Get pool recipient access',
    pathParameters: {
      [PARAMS.BASE_AUTHORITY]: PARAM_DICTIONARY[PARAMS.BASE_AUTHORITY],
      [PARAMS.AUTHORITY]: PARAM_DICTIONARY[PARAMS.AUTHORITY],
      [PARAMS.POOL_ID]: PARAM_DICTIONARY[PARAMS.POOL_ID],
    },
    callback(request) {
      logger.info({ request }, 'GET pool recipient access');
      if (request.method !== 'GET') {
        return buildResponse({
          data: { error: 'Method not allowed' },
          statusCode: 405,
        });
      }
      const data = openJsonFile('messaging-api-mock','pools/get-pool-access', 'default');
      return buildResponse({ data });
    },
  },
};

module.exports = ROUTES;
