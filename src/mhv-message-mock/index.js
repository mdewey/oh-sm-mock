const { logger } = require('../logger');

const PATIENT = require('./routes/message');

const SCHEMA = {
  ...PATIENT,
};

class MhvMessagingMock {
  basePath = '/mhv-sm-api/patient/v1/';

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
  MhvMessagingMock: new MhvMessagingMock(),
};
