const fs = require('node:fs');
const path = require('node:path');

const openJsonFile = (folder, fileSlug) => {
  const defaultPath = path.join(__dirname, `/data/${folder}/default.json`);
  const messagePath = path.join(__dirname, `/data/${folder}/${fileSlug}.json`);
  console.log("opening file", { __dirname, fileSlug, messagePath, defaultPath });
  // check if file exists
  const pathToOpen = fs.existsSync(messagePath) ? messagePath : defaultPath;
  console.log("opening file", { pathToOpen });
  const data = fs.readFileSync(pathToOpen, 'utf8');
  const json = JSON.parse(data);
  return json;
}

const buildResponse = ({ data, statusCode = 200 }) => {
  return {
    statusCode,
    'headers': {
      "Content-Type": "application/json; charset=utf-8"
    },
    'body': JSON.stringify(data),
  }
}


const PARAMS = {
  BASE_AUTHORITY: 'baseAuthority',
  AUTHORITY: 'authority',
  PATIENT_ID: 'patientId',
  MESSAGE_ID: 'messageIds',
  STATUS: 'status'
}

const PARAM_DICTIONARY = {
  [PARAMS.BASE_AUTHORITY]: ["[A-Z0-9\\-]+"],
  [PARAMS.AUTHORITY]: ["[A-Z0-9\\-]+"],
  [PARAMS.PATIENT_ID]: ["[A-Z0-9\\-]+"],
  [PARAMS.MESSAGE_ID]: ["([A-z0-9]*):-[0-9]:[0-9]:[0-9],?"],
  [PARAMS.STATUS]: ["[A-z0-9]*"]
}

const ROUTES = {

  '{authority}/patients/{patientId}/inbox/messages': {
    name: 'Get messages for patient',
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
      if (request.method !== 'GET') {
        return buildResponse({ data: { error: 'Method not allowed' }, statusCode: 405 })
      }
      const data = openJsonFile('get-messages', 'default');
      return buildResponse({ data })
    }
  },
  '{authority}/patients/{patientId}/inbox/messages/{messageIds}': {
    name: 'Get message for patient',
    pathParameters: {
      [PARAMS.BASE_AUTHORITY]: PARAM_DICTIONARY[PARAMS.BASE_AUTHORITY],
      [PARAMS.AUTHORITY]: PARAM_DICTIONARY[PARAMS.AUTHORITY],
      [PARAMS.PATIENT_ID]: PARAM_DICTIONARY[PARAMS.PATIENT_ID],
      [PARAMS.MESSAGE_ID]: PARAM_DICTIONARY[PARAMS.MESSAGE_ID],
    },
    times: {
      'unlimited': true
    },
    callback: function (request, times, priority) {
      console.log("doing things", { request, times, priority });
      if (request.method !== 'GET' && request.method !== 'DELETE') {
        return buildResponse({ data: { error: 'Method not allowed' }, statusCode: 405 })
      }
      if (request.method === 'DELETE') {
        return buildResponse({ data: { message: 'Message deleted' }, statusCode: 200 })
      }
      const id = request.pathParameters[PARAMS.MESSAGE_ID][0].replace(/:/g, '_');
      const rvData = openJsonFile('get-message-by-id', id);
      const rv = {
        ...rvData,
      }
      return buildResponse({ data: rv })
    }
  },
  '{authority}/patients/{patientId}/inbox/messages/{messageIds}/status/{status}': {
    name: 'Update message status for patient',
    pathParameters: {
      [PARAMS.BASE_AUTHORITY]: PARAM_DICTIONARY[PARAMS.BASE_AUTHORITY],
      [PARAMS.AUTHORITY]: PARAM_DICTIONARY[PARAMS.AUTHORITY],
      [PARAMS.PATIENT_ID]: PARAM_DICTIONARY[PARAMS.PATIENT_ID],
      [PARAMS.MESSAGE_ID]: PARAM_DICTIONARY[PARAMS.MESSAGE_ID],
      [PARAMS.STATUS]: PARAM_DICTIONARY[PARAMS.STATUS],
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
      return buildResponse({ data: {} })
    }
  },

}


module.exports = ROUTES;