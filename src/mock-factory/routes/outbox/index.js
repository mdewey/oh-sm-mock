const { logger } = require('../../../logger');

const {
  buildResponse,
  PARAMS,
  PARAM_DICTIONARY,
  openJsonFile,
} = require('../../utils');

const ROUTES = {
  '{authority}/patients/{patientId}/outbox/messages': {
    name: 'GET | POST - Retrieves and adds messages by patient recipient',
    pathParameters: {
      [PARAMS.BASE_AUTHORITY]: PARAM_DICTIONARY[PARAMS.BASE_AUTHORITY],
      [PARAMS.AUTHORITY]: PARAM_DICTIONARY[PARAMS.AUTHORITY],
      [PARAMS.PATIENT_ID]: PARAM_DICTIONARY[PARAMS.PATIENT_ID],
    },
    times: {
      unlimited: true,
    },
    callback(request) {
      logger.info({ request }, 'GET messages for patient');
      if (request.method !== 'GET' && request.method !== 'POST') {
        return buildResponse({
          data: { error: 'Method not allowed' },
          statusCode: 405,
        });
      }

      if (request.method === 'POST') {
        const data = openJsonFile('outbox/post-outbox-messages', 'default');
        return buildResponse({ data, statusCode: 201 });
      }

      const data = openJsonFile('outbox/get-outbox-messages', 'default');
      return buildResponse({ data });
    },
  },
  '{authority}/patients/{patientId}/outbox/messages/{messageIds}': {
    name: 'GET - Retrieves sent items for a patient recipient',
    pathParameters: {
      [PARAMS.BASE_AUTHORITY]: PARAM_DICTIONARY[PARAMS.BASE_AUTHORITY],
      [PARAMS.AUTHORITY]: PARAM_DICTIONARY[PARAMS.AUTHORITY],
      [PARAMS.PATIENT_ID]: PARAM_DICTIONARY[PARAMS.PATIENT_ID],
      [PARAMS.MESSAGE_ID]: PARAM_DICTIONARY[PARAMS.MESSAGE_ID],
    },
    times: {
      unlimited: true,
    },
    callback(request) {
      logger.info({ request }, 'GET messages for patient');
      if (request.method !== 'GET') {
        return buildResponse({
          data: { error: 'Method not allowed' },
          statusCode: 405,
        });
      }
      const id = request.pathParameters[PARAMS.MESSAGE_ID]
        .join(',')
        .replace(/:/g, '_');
      const rvData = openJsonFile('outbox/get-messages-by-id', id);
      const rv = {
        ...rvData,
      };
      return buildResponse({ data: rv });
    },
  },
};

module.exports = ROUTES;
