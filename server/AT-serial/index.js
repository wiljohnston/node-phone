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

    if (this.options.devMode) {
      this.runDevModeLoop();
    } else {
      this.listenProcess = this.listen();

      this.listenProcess.stdout.on(`data`, message => {
        message = message.toString();
        this.onOut(message);
      });

      this.listenProcess.stderr.on(`data`, error => {
        throw new Error(`Serial interface python listen error: ${error}`);
      });
    }
  }

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
