const mockserver = require('mockserver-node');
const mockServerClient = require('mockserver-client').mockServerClient;

const PORT = 3000;

mockserver.start_mockserver({
  serverPort: PORT,
  trace: true,
  verbose: true,
}).then(
  function () {
    console.log("started MockServer");
    const mocks = [
      {
        'httpRequest': {
          'path': '/somePathOne'
        },
        'httpResponse': {
          'statusCode': 200,
          'body': JSON.stringify({ 'value': 'one' })
        }
      },
      {
        'httpRequest': {
          'path': '/somePathTwo'
        },
        'httpResponse': {
          'statusCode': 200,
          'body': JSON.stringify({ 'value': 'one' })
        }
      },
      {
        'httpRequest': {
          'path': '/somePathThree'
        },
        'httpResponse': {
          'statusCode': 200,
          'body': JSON.stringify({ 'value': 'one' })
        }
      }
    ]

    mockServerClient("localhost", PORT)
      .mockAnyResponse(mocks)
      .then(
        function () {
          console.log("expectation created");
        },
        function (error) {
          console.log({ error });
        }
      );
  },
  function (error) {
    console.log(JSON.stringify(error, null, "  "));
  }
);


