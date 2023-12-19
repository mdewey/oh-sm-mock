const fs = require('node:fs');
const path = require('node:path');

const openJsonFile = (fileSlug) => {
  const defaultPath = path.join(__dirname, "/data/get-message-by-id/default.json");
  const messagePath = path.join(__dirname, `/data/get-message-by-id/${fileSlug}.json`);
  console.log("opening file", { __dirname, fileSlug, messagePath, defaultPath });
  // check if file exists
  const pathToOpen = fs.existsSync(messagePath) ? messagePath : defaultPath;
  console.log("opening file", { pathToOpen });
  const data = fs.readFileSync(pathToOpen, 'utf8');
  const json = JSON.parse(data);
  return json;
}


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
      'messageId': ["([A-z0-9]*):-[0-9]:[0-9]:[0-9]"]
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
      const id = request.pathParameters.messageId[0].replace(/:/g, '_');
      const rvData = openJsonFile(id);
      const rv = {
        ...rvData,
      }
      return {
        'statusCode': 200,
        'headers': {
          "Content-Type": "application/json; charset=utf-8"
        },
        'body': JSON.stringify(rv),
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