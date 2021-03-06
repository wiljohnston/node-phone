const path = require(`path`);
const { spawn } = require(`child_process`);
const readline = require(`readline`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = class SerialInterface {
  constructor(onOut, options) {
    this.options = {
      pythonCommand: `python`,
      serialPort: `/dev/ttyAMA0`,
      baudRate: 115200,
      devMode: false,
      ...options
    };

    this.onOut = onOut;

    console.log(`Running initial startup`);
    this.startup();
  }

  //

  startup = () => {
    if (this.options.devMode) {
      this.runDevModeLoop();
    } else {
      this.listenProcess = this.listen();

      this.listenProcess.stdout.on(`data`, message => {
        message = message.toString();
        console.log(`Message received:`, message);
        this.onOut(message);
      });

      this.listenProcess.stderr.on(`data`, error => {
        if (this.options.devMode) {
          throw new Error(`Serial interface python listen error: ${error}`);
        }
        console.log(`Serial interface python listen error: ${error}`);
        console.log(`Restarting listen process`);
        this.startup();
      });
    }
  };

  //

  listen = () => {
    return spawn(this.options.pythonCommand, [
      `-u`,
      path.join(__dirname, `/python/listen.py`),
      this.options.serialPort,
      this.options.baudRate
    ]);
  };

  //

  sendAT = command => {
    if (this.options.devMode) {
      // eslint-disable-next-line no-console
      return console.log(`DEVMODE COMMAND RECEIVED: "${command}"`);
    }

    console.log(`Sending AT command:`, command);

    return spawn(this.options.pythonCommand, [
      `-u`,
      path.join(__dirname, `/python/send_at.py`),
      this.options.serialPort,
      this.options.baudRate,
      command
    ]);
  };

  //

  runDevModeLoop = () => {
    rl.question(`YOU ARE THE PHONE. SAY SOMETHING: `, message => {
      this.onOut(message);
      this.runDevModeLoop();
    });
  };
};
