const { logger } = require('../../../logger');

const {
  buildResponse,
  PARAMS,
  PARAM_DICTIONARY,
  openJsonFile,
} = require('../../../utils');

const ROUTES = {
  '{authority}/patients/{patientId}/inbox/messages': {
    name: 'Get messages for patient',
    pathParameters: {
      [PARAMS.BASE_AUTHORITY]: PARAM_DICTIONARY[PARAMS.BASE_AUTHORITY],
      [PARAMS.AUTHORITY]: PARAM_DICTIONARY[PARAMS.AUTHORITY],
      [PARAMS.PATIENT_ID]: PARAM_DICTIONARY[PARAMS.PATIENT_ID],
    },
    callback(request) {
      logger.info({ request }, 'GET messages for patient');
      if (request.method !== 'GET') {
        return buildResponse({
          data: { error: 'Method not allowed' },
          statusCode: 405,
        });
      }
      const data = openJsonFile(
        'messaging-api-mock',
        'inbox/get-messages',
        'default',
      );
      return buildResponse({ data });
    },
  },
  '{authority}/patients/{patientId}/inbox/messages/{messageIds}': {
    name: 'Get message for patient',
    pathParameters: {
      [PARAMS.BASE_AUTHORITY]: PARAM_DICTIONARY[PARAMS.BASE_AUTHORITY],
      [PARAMS.AUTHORITY]: PARAM_DICTIONARY[PARAMS.AUTHORITY],
      [PARAMS.PATIENT_ID]: PARAM_DICTIONARY[PARAMS.PATIENT_ID],
      [PARAMS.MESSAGE_ID]: PARAM_DICTIONARY[PARAMS.MESSAGE_ID],
    },
    callback(request, times, priority) {
      logger.info({ request, times, priority }, 'doing things');
      if (request.method !== 'GET' && request.method !== 'DELETE') {
        return buildResponse({
          data: { error: 'Method not allowed' },
          statusCode: 405,
        });
      }
      if (request.method === 'DELETE') {
        return buildResponse({
          data: { message: 'Message deleted' },
          statusCode: 200,
        });
      }
      logger.info(
        'GET message | message ids: ',
        request.pathParameters[PARAMS.MESSAGE_ID].join(','),
      );

      const id = request.pathParameters[PARAMS.MESSAGE_ID]
        .join(',')
        .replace(/:/g, '_');
      const rvData = openJsonFile(
        'messaging-api-mock',
        'inbox/get-message-by-id',
        id,
      );
      const rv = {
        ...rvData,
      };
      return buildResponse({ data: rv });
    },
  },
  '{authority}/patients/{patientId}/inbox/messages/{messageIds}/status/{status}':
    {
      name: 'Update message status for patient',
      pathParameters: {
        [PARAMS.BASE_AUTHORITY]: PARAM_DICTIONARY[PARAMS.BASE_AUTHORITY],
        [PARAMS.AUTHORITY]: PARAM_DICTIONARY[PARAMS.AUTHORITY],
        [PARAMS.PATIENT_ID]: PARAM_DICTIONARY[PARAMS.PATIENT_ID],
        [PARAMS.MESSAGE_ID]: PARAM_DICTIONARY[PARAMS.MESSAGE_ID],
        [PARAMS.STATUS]: PARAM_DICTIONARY[PARAMS.STATUS],
      },
      times: {
        unlimited: true,
      },
      callback(request, times, priority) {
        logger.info({ request, times, priority }, 'doing things');
        if (request.method !== 'PUT') {
          return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
          };
        }
        return buildResponse({ data: {} });
      },
    },
};

module.exports = ROUTES;
