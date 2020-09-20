require(`dotenv`).config();

const port = 8000;
const { server: WebSocketServer } = require(`websocket`);
const http = require(`http`);
const SerialInterface = require(`./AT-serial`);

const httpServer = http.createServer();
httpServer.listen(port);

// eslint-disable-next-line no-console
console.log(`Socket server listening on port ${port}`);

const socketServer = new WebSocketServer({
  httpServer
});

const serialOptions = {
  pythonCommand: `python`,
  serialPort: `/dev/ttyAMA0`,
  baudRate: 115200,
  devMode: process.env.DEV_MODE === `1`
};

const clients = []; // for react devmode reconnections
let serialInterface;

socketServer.on(`request`, request => {
  const client = request.accept(null, request.origin);
  clients.push(client);

  if (clients.length === 1) {
    // only on first connection do we need to declare this
    serialInterface = new SerialInterface(at => {
      clients.forEach(thisClient => thisClient.sendUTF(JSON.stringify({ at })));
    }, serialOptions);
  }

  client.on(`message`, ({ utf8Data: at }) => {
    serialInterface.sendAT(at);
  });
});
