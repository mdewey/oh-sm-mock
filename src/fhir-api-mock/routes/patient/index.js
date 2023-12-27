const { logger } = require('../../../logger');

const {
  buildResponse,
  PARAMS,
  PARAM_DICTIONARY,
  openJsonFile,
} = require('../../../utils');

const ROUTES = {
  'patient/{patientId}': {
    name: 'GET Patient Resource by ID',
    pathParameters: {
      [PARAMS.INSTANCE_ID]: PARAM_DICTIONARY[PARAMS.INSTANCE_ID],
      [PARAMS.FHIR_PATIENT_ID]: PARAM_DICTIONARY[PARAMS.FHIR_PATIENT_ID],
    },
    times: {
      unlimited: true,
    },
    callback(request) {
      logger.info({ request }, 'GET Patient Resource by ID');
      if (request.method !== 'GET') {
        return buildResponse({
          data: { error: 'Method not allowed' },
          statusCode: 405,
        });
      }
      const data = openJsonFile('fhir-api-mock','patient', 'default');
      return buildResponse({ data });
    },
  }
};

module.exports = ROUTES;
