const SCHEMA = {
  '{authority}/patients/{patientId}/inbox/messages': {
    name: 'Get messages for patient',
    pathParameters: {
      'baseAuthority': ["[A-Z0-9\\-]+"],
      'authority': ["[A-Z0-9\\-]+"],
      'patientId': ["[A-Z0-9\\-]+"]
    },
    times: {
      'unlimited': true
    },
    callback: function (request, times, priority) {
      console.log("doing things", { request, times, priority });
      const rv = {
        meta: {
          params: {
            'baseAuthority': request.pathParameters.baseAuthority[0],
            'authority': request.pathParameters.authority[0],
            'patientId': request.pathParameters.patientId[0]
          }
        }
      }
      return {
        'statusCode': 200,
        'body': JSON.stringify(rv)
      }
    }

  }
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