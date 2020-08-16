const port = 8000;
const { server: WebSocketServer } = require(`websocket`);
const http = require(`http`);
const NodePhoneInterface = require(`./node-phone-interface`);

const httpServer = http.createServer();
httpServer.listen(port);

// eslint-disable-next-line no-console
console.log(`listening on port ${port}`);

const socketServer = new WebSocketServer({
  httpServer
});

const clientFunctions = {};
let client;

socketServer.on(`request`, request => {
  client = request.accept(null, request.origin);

  client.on(`message`, ({ utf8Data: message }) => {
    console.log(
      `\n\n\n\n===SERVER===: message received from client: `,
      message
    );
    if (clientFunctions[message]) {
      clientFunctions[message]();
    } else {
      // eslint-disable-next-line no-console
      console.log(`No function to call for client message ${message}`);
    }
  });
});

// eslint-disable-next-line no-unused-vars
const phone = new NodePhoneInterface(
  {
    onRing: (phoneNumber, answerCall) => {
      console.log(`===SERVER===: ring callback triggered!`);
      client.sendUTF(
        JSON.stringify({
          event: `INCOMING_CALL`,
          metadata: { phoneNumber }
        })
      );

      clientFunctions.ANSWER_CALL = answerCall;
    }
  },
  { devMode: true }
);
