const NodePhone = require(`../AT-serial`);

module.exports = class NodePhoneInterface {
  constructor(callBacks, options) {
    console.log('interface constructor called');
    this.awaitQueue = [];
    this.awaitBunch = [];
    this.options = {
      devMode: false,
      pythonCommand: `python`,
      serialPort: `/dev/ttyAMA0`,
      baudRate: 115200,
      ...options
    };
    this.setUpCommands = [`AT+CLIP=1`];
    this.callBacks = {
      onRing: number => console.log(`incoming call from "${number}"`),
      onAnswerCall: () => console.log(`call answered`),
      onAnswerCallFailed: () => console.log(`failed to answer call`),
      ...callBacks
    };
    this.phone = null;
    this.init()
  }

  //

  init = () => {
    console.log(`initialising - instantiating NodePhone..`);
    this.phone = new NodePhone(this.onATReceived, {
      onReady: this.setUp,
      ...this.options
    });
  };

  //

  setUp = () => {
    console.log(`setUp has been called..`);
    this.setUpCommands.forEach(command => this.performTask(command));
  };

  //

  performTask = (
    command,
    waitForValues = [`OK`],
    onResolve = message =>
      console.log(`Command "${command}" resolved with message "${message}"`),
    dieOnValues = [`ERROR`],
    onDie = message =>
      console.log(`Command "${command}" erred with message "${message}"`)
  ) => {
    this.phone.sendAT(command);
    this.awaitQueue.push({
      waitFor: {
        values: waitForValues,
        callBack: onResolve
      },
      dieOn: {
        values: dieOnValues,
        callBack: onDie
      }
    });
  };

  //
  // Add to the bunch things that need to skip the queue, per se; things that will come back straight away. Eg answer a phone call.
  // These will be checked on every message that comes through and isn't caught by onATReceied
  addToBunch = ({ value, callBack, timeout, onTimeout }) => {
    this.awaitBunch.push({ value, callBack, timeout, onTimeout });
  };

  //

  onATReceived = message => {
    console.log(`AT received: "${message}"`);
    if (this.awaitQueue.length > 0) {
      console.log(`going through awaitQueue..`);
      // check the first item from the queue and see if we can resolve/reject
      const { waitFor, dieOn } = this.awaitQueue[0];
      if (waitFor.values.find(value => message.includes(value))) {
        console.log(`wait for found!`);
        waitFor.callBack(message);
        this.awaitQueue.shift();
      }
      else if (dieOn.values.find(value => message.includes(value))) {
        console.log(`die on found!`);
        dieOn.callBack(message);
        this.awaitQueue.shift();
      } 
      else {
        console.log(`no match in queue, sending it to processUncaughtMessage`);
        this.processUncaughtMessage(message);
      }
    } 
    else {
      console.log(`queue is empty, sending it to processUncaughtMessage`);
      this.processUncaughtMessage(message);
    }
  };

  //

  processUncaughtMessage(message) {
    // check to see if any process was waiting for these values
    console.log(`processing uncaught message: "${message}"`);
    const pickFromBunchIndex = this.awaitBunch.findIndex(({ value }) =>
      message.includes(value)
    );
    if (pickFromBunchIndex !== -1) {
      const [pickFromBunch] = this.awaitBunch.splice(pickFromBunchIndex, 1);
      console.log(`found something in the bunch, calling its callbacl`);
      pickFromBunch.callBack(message);
    } 
    else {
      console.log(`no pick from bunch found, heading to switch statement`);
      switch (message.trim()) {
        case `RING`:
          console.log(`it's RING! adding +CLIP to bunch to see who's calling`);
          // eslint-disable-next-line no-case-declarations
          const clipCallBack = clipLine => {
            console.log(`clip callback called`);
            const phoneNumber = clipLine.split(`"`)[1];
            console.log(`clip callback found phone number: "${phoneNumber}".`);
            this.callBacks.onRing(phoneNumber, this.answerCall);
          };
          this.addToBunch({ value: `+CLIP:`, callBack: clipCallBack });
          break;

        default:
          console.log(
            `we've reached end of the line - message being discarded: "${message}"`
          );
          break;
      }
    }
  }

  //

  answerCall = () => {
    console.log(`answerCall called. Calling performTask with ATA/OK`);
    this.performTask(
      `ATA`,
      [`OK`],
      this.callBacks.onAnswerCall,
      [`ERROR`],
      this.callBacks.onAnswerCallFailed
    );
  };

  //

  hangUpCall = () => {
    console.log(`hangUpCall called. Calling performTask with AT+CHUP/OK`);
    this.performTask(
      `AT+CHUP`,
      [`OK`],
      this.callBacks.onHangUpCall
    );
  };
};
