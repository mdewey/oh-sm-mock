const ROUTES = {
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
  },
  '{authority}/patients/{patientId}/inbox/messages/{messageId}': {
    name: 'Get message for patient',
    pathParameters: {
      'baseAuthority': ["[A-Z0-9\\-]+"],
      'authority': ["[A-Z0-9\\-]+"],
      'patientId': ["[A-Z0-9\\-]+"],
      'messageId': ["[A-Z0-9\\-]+"]
    },
    times: {
      'unlimited': true
    },
    callback: function (request, times, priority) {
      console.log("doing things", { request, times, priority });
      if (request.method !== 'GET' && request.method !== 'DELETE') {
        return {
          'statusCode': 405,
          'body': JSON.stringify({ error: 'Method not allowed' })
        }
      }
      if (request.method === 'DELETE') {
        return {
          'statusCode': 204,
          'body': ''
        }
      }
      const rv = {
        meta: {
          method: request.method,
          params: {
            'baseAuthority': request.pathParameters.baseAuthority[0],
            'authority': request.pathParameters.authority[0],
            'patientId': request.pathParameters.patientId[0],
            'messageId': request.pathParameters.messageId[0]
          }
        }
      }
      return {
        'statusCode': 200,
        'body': JSON.stringify(rv)
      }
    }
  },
  '{authority}/patients/{patientId}/inbox/messages/{messageIds}/status/{status}': {
    name: 'Update message status for patient',
    pathParameters: {
      'baseAuthority': ["[A-Z0-9\\-]+"],
      'authority': ["[A-Z0-9\\-]+"],
      'patientId': ["[A-Z0-9\\-]+"],
      'messageIds': ["[A-Z0-9\\-]+"],
      'status': ["[A-Z0-9\\-]+"]
    },
    times: {
      'unlimited': true
    },
    callback: function (request, times, priority) {
      console.log("doing things", { request, times, priority });
      if (request.method !== 'PUT') {
        return {
          'statusCode': 405,
          'body': JSON.stringify({ error: 'Method not allowed' })
        }
      }
      const rv = {
        meta: {
          method: request.method,
          params: {
            'baseAuthority': request.pathParameters.baseAuthority[0],
            'authority': request.pathParameters.authority[0],
            'patientId': request.pathParameters.patientId[0],
            'messageIds': request.pathParameters.messageIds[0],
            'status': request.pathParameters.status[0]
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


module.exports = ROUTES;