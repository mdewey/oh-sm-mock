const INBOX = require('./inbox');


const SCHEMA = {
  ...INBOX
}

class MessagingApiMock {
  basePath = '/messaging/{baseAuthority}/service/'

  constructor() {
    this.messages = [];
    this.paths = Object.keys(SCHEMA).map(path => this.basePath + path);
  }

  allPaths() {
    console.log(this.paths)
    return paths;
  }

  createMockPaths() {
    console.log("paths", SCHEMA)
    return this.paths.map(path => {
      const pathSchema = SCHEMA[path.replace(this.basePath, '')];
      return {
        'httpRequest': {
          'path': path,
          'pathParameters': {
            ...pathSchema.pathParameters
          },
        },
        ...pathSchema
      }
    })
  }

}

module.exports = {
  MessagingApiMock: new MessagingApiMock()
}