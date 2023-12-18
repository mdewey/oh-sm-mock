const mockserver = require('mockserver-node');
const mockServerClient = require('mockserver-client').mockServerClient;
const { MessagingApiMock } = require('./mock-factory/messaging');
const PORT = 3000;

mockserver.start_mockserver({
  serverPort: PORT,
  verbose: true,
}).then(
  function () {
    console.log("started MockServer");
    const mocks = MessagingApiMock.createMockPaths();
    console.log(`LOG: creating ${mocks.length} mocks`);
    mocks.forEach(mock => {
      console.log(mock);
      mockServerClient("localhost", PORT)
        .mockWithCallback(
          {
            'path': mock.httpRequest.path,
            'pathParameters': {
              ...mock.httpRequest.pathParameters
            },
          },
          mock.callback,
          mock.times,
        )
        .then(
          function () {
            console.log(`expectation created: ${mock.name} | ${mock.httpRequest.path}`);
          },
          function (error) {
            console.log(error);
          }
        );
    })
  },
  function (error) {
    console.log(JSON.stringify(error, null, "  "));
  }
);


