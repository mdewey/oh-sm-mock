/* eslint-disable no-console */
const {
  buildResponse,
  PARAMS,
  PARAM_DICTIONARY,
  openJsonFile,
} = require('../../utils');

const ROUTES = {
  '{authority}/patients/{patientId}/inbox/messages': {
    name: 'Get messages for patient',
    pathParameters: {
      [PARAMS.BASE_AUTHORITY]: PARAM_DICTIONARY[PARAMS.BASE_AUTHORITY],
      [PARAMS.AUTHORITY]: PARAM_DICTIONARY[PARAMS.AUTHORITY],
      [PARAMS.PATIENT_ID]: PARAM_DICTIONARY[PARAMS.PATIENT_ID],
    },
    times: {
      unlimited: true,
    },
    callback(request) {
      console.log('GET messages for patient', { request });
      if (request.method !== 'GET') {
        return buildResponse({
          data: { error: 'Method not allowed' },
          statusCode: 405,
        });
      }
      const data = openJsonFile('inbox/get-messages', 'default');
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
    times: {
      unlimited: true,
    },
    callback(request, times, priority) {
      console.log('doing things', { request, times, priority });
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
      console.log('GET message | message ids: ', request.pathParameters[PARAMS.MESSAGE_ID].join(','));

      const id = request.pathParameters[PARAMS.MESSAGE_ID].join(',').replace(/:/g, '_');
      const rvData = openJsonFile('inbox/get-message-by-id', id);
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
      console.log('doing things', { request, times, priority });
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
