const fs = require('node:fs');
const path = require('node:path');

const { buildResponse, PARAMS, PARAM_DICTIONARY, openJsonFile } = require('../utils');


const ROUTES = {
  '{authority}/patients/{patientId}/outbox/messages': {
    name: 'GET | POST - Retrieves and adds messages by patient recipient',
    pathParameters: {
      [PARAMS.BASE_AUTHORITY]: PARAM_DICTIONARY[PARAMS.BASE_AUTHORITY],
      [PARAMS.AUTHORITY]: PARAM_DICTIONARY[PARAMS.AUTHORITY],
      [PARAMS.PATIENT_ID]: PARAM_DICTIONARY[PARAMS.PATIENT_ID],
    },
    times: {
      'unlimited': true
    },
    callback: function (request) {
      console.log('GET messages for patient', { request });
      if (request.method !== 'GET' && request.method !== 'POST') {
        return buildResponse({ data: { error: 'Method not allowed' }, statusCode: 405 })
      }

      if (request.method === 'POST') {
        const data = openJsonFile('outbox/post-outbox-messages', 'default');
        return buildResponse({ data, statusCode: 201 });
      }


      const data = openJsonFile('outbox/get-outbox-messages', 'default');
      return buildResponse({ data });
    }
  },


}


module.exports = ROUTES;