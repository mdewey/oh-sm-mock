const mockserver = require('mockserver-node');
const { mockServerClient } = require('mockserver-client');
const { MessagingApiMock } = require('./mock-factory');

const { logger } = require('./logger');

const PORT = 3000;

mockserver
  .start_mockserver({
    serverPort: PORT,
    verbose: true,
  })
  .then(
    () => {
      logger.info('started MockServer');
      const mocks = MessagingApiMock.createMockPaths();
      logger.info('LOG: creating %d mocks', mocks.length);
      mocks.forEach((mock) => {
        logger.info(mock);
        mockServerClient('localhost', PORT)
          .mockWithCallback(
            {
              path: mock.httpRequest.path,
              pathParameters: {
                ...mock.httpRequest.pathParameters,
              },
            },
            mock.callback,
            mock.times,
          )
          .then(
            () => {
              logger.info(
                'expectation created: %s | %s',
                mock.name,
                mock.httpRequest.path,
              );
            },
            (error) => {
              logger.error(error);
            },
          );
      });
    },
    (error) => {
      logger.error(error);
    },
  );
