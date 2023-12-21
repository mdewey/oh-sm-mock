/* eslint-disable no-console */
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
    console.log(this.paths);
    return this.paths;
  }

  createMockPaths() {
    console.log('paths', SCHEMA);
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
