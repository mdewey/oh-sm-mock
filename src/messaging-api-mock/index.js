const { logger } = require('../logger');

const INBOX = require('./routes/inbox');
const OUTBOX = require('./routes/outbox');
const PERSONNEL = require('./routes/personnel');
const POOLS = require('./routes/pools');

const SCHEMA = {
  ...INBOX,
  ...OUTBOX,
  ...PERSONNEL,
  ...POOLS,
};

class MessagingApiMock {
  basePath = '/messaging/{baseAuthority}/service/';

  constructor() {
    this.messages = [];
    this.paths = Object.keys(SCHEMA).map((path) => this.basePath + path);
  }

  allPaths() {
    logger.info(this.paths);
    return this.paths;
  }

  createMockPaths() {
    logger.info('building messaging api', SCHEMA);
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
  MessagingApiMock: new MessagingApiMock(),
};
