/* eslint-disable no-console */
const mockserver = require('mockserver-node');
const { mockServerClient } = require('mockserver-client');
const { MessagingApiMock } = require('./mock-factory');

const PORT = 3000;

mockserver
  .start_mockserver({
    serverPort: PORT,
    verbose: true,
  })
  .then(
    () => {
      console.log('started MockServer');
      const mocks = MessagingApiMock.createMockPaths();
      console.log(`LOG: creating ${mocks.length} mocks`);
      mocks.forEach((mock) => {
        console.log(mock);
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
              console.log(
                `expectation created: ${mock.name} | ${mock.httpRequest.path}`,
              );
            },
            (error) => {
              console.log(error);
            },
          );
      });
    },
    (error) => {
      console.log(JSON.stringify(error, null, '  '));
    },
  );
