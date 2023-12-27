const { logger } = require('../logger');

const PATIENT = require('./routes/patient');

const SCHEMA = {
  ...PATIENT,
};

class FhirR4ApiMock {
  basePath = '/r4/{instanceId}/';

  constructor() {
    this.messages = [];
    this.paths = Object.keys(SCHEMA).map((path) => this.basePath + path);
  }

  allPaths() {
    logger.info(this.paths);
    return this.paths;
  }

  createMockPaths() {
    logger.info('building fhir r4 api', SCHEMA);
    return this.paths.map((path) => {
      const pathSchema = SCHEMA[path.replace(this.basePath, '')];
      return {
        httpRequest: {
          path,
          pathParameters: {
            ...pathSchema.pathParameters,
          },
        },
        ...pathSchema,
      };
    });
  }
}

module.exports = {
  FhirR4ApiMock: new FhirR4ApiMock(),
};
