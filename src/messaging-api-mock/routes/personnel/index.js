const { logger } = require('../../../logger');

const {
  buildResponse,
  PARAMS,
  PARAM_DICTIONARY,
  openJsonFile,
} = require('../../../utils');

const ROUTES = {
  '{authority}/personnel/{personnelIds}/recipient-access': {
    name: 'Retrieves information used to determine if personnel have access to messaging',
    pathParameters: {
      [PARAMS.BASE_AUTHORITY]: PARAM_DICTIONARY[PARAMS.BASE_AUTHORITY],
      [PARAMS.AUTHORITY]: PARAM_DICTIONARY[PARAMS.AUTHORITY],
      [PARAMS.PERSONNEL_ID]: PARAM_DICTIONARY[PARAMS.PERSONNEL_ID],
    },
    times: {
      unlimited: true,
    },
    callback(request) {
      logger.info(
        { request },
        'GET Retrieves information used to determine if personnel have access to messaging',
      );
      if (request.method !== 'GET') {
        return buildResponse({
          data: { error: 'Method not allowed' },
          statusCode: 405,
        });
      }
      const data = openJsonFile('messaging-api-mock','personnel/get-recipient-access', 'default');
      return buildResponse({ data });
    },
  },
};

module.exports = ROUTES;
