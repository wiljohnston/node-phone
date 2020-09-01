import React, { useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const server = new W3CWebSocket(`ws://127.0.0.1:8000`);

const App = () => {
  const handleMessage = at => {
    // eslint-disable-next-line no-console
    console.log(`Received message '${at}' from server`);
  };

  useEffect(() => {
    server.onopen = () => {
      server.onmessage = message => {
        console.log("raw message received: " + message?.data)
        if(message?.data){
          handleMessage(JSON.parse(message.data).at);
        }
      }
    };
  }, []);


  return (
    <div
      style={{
        width: `100%`,
        height: `100%`,
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        justifyContent: `center`
      }}
    >
      <p>Nothing to see here..</p>
      <button className="h-48">touch</button>
    </div>
  );
};

export default App;
