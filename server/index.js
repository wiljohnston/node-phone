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

socketServer.on(`request`, request => {
  const client = request.accept(null, request.origin);

  const serialInterface = new SerialInterface(at => {
    client.sendUTF(JSON.stringify({ at }));
  }, serialOptions);

  client.on(`message`, ({ utf8Data: at }) => {
    serialInterface.sendAT(at);
  });
});
