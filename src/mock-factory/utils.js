const fs = require('node:fs');
const path = require('node:path');

const { logger } = require('../logger');

const buildResponse = ({ data, statusCode = 200 }) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify(data),
});

const PARAMS = {
  BASE_AUTHORITY: 'baseAuthority',
  AUTHORITY: 'authority',
  PATIENT_ID: 'patientId',
  MESSAGE_ID: 'messageIds',
  STATUS: 'status',
  PERSONNEL_ID: 'personnelIds',
  POOL_ID: 'poolIds',
};

const PARAM_DICTIONARY = {
  [PARAMS.BASE_AUTHORITY]: ['[A-Z0-9\\-]+'],
  [PARAMS.AUTHORITY]: ['[A-Z0-9\\-]+'],
  [PARAMS.PATIENT_ID]: ['[A-Z0-9\\-]+'],
  [PARAMS.MESSAGE_ID]: ['([A-z0-9]*):-[0-9]:[0-9]:[0-9],?'],
  [PARAMS.STATUS]: ['[A-z0-9]*'],
  [PARAMS.PERSONNEL_ID]: ['[A-z0-9]*,?'],
  [PARAMS.POOL_ID]: ['[A-z0-9]*,?'],
};

const openJsonFile = (folder, fileSlug) => {
  const defaultPath = path.join(__dirname, `/data/${folder}/default.json`);
  const messagePath = path.join(__dirname, `/data/${folder}/${fileSlug}.json`);
  logger.info(
    {
      __dirname,
      fileSlug,
      messagePath,
      defaultPath,
    },
    'opening file',
  );
  // check if file exists
  const pathToOpen = fs.existsSync(messagePath) ? messagePath : defaultPath;
  logger.info({ pathToOpen }, 'opening file');
  const data = fs.readFileSync(pathToOpen, 'utf8');
  const json = JSON.parse(data);
  return json;
};

module.exports = {
  buildResponse,
  PARAMS,
  PARAM_DICTIONARY,
  openJsonFile,
};
