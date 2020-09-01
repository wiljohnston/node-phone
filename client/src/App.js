import React, { useEffect, useState } from "react";
import Button from "./components/Button"
import { w3cwebsocket as W3CWebSocket } from "websocket";

const server = new W3CWebSocket(`ws://127.0.0.1:8000`);

const App = () => {
  const [currentEvent, setCurrentEvent] = useState({});

  // if we just keep changing what the controller keys are, we can change what we are listening for. 
  // Eg after RING, add a key to listen for the phone number. Then we can clear it after we hang up.
  const controller = {
    "RING": at => {
      setCurrentEvent({ key: "CALL_INCOMING", at })
    },
    "+CLIP:": at => {
      setCurrentEvent(currentEvent => ({ ...currentEvent, callerId: at.split(` `)[1] }))
    },
  }

  const eventJSX = {
    "CALL_INCOMING": (<div className="grid-end-12 flex justify-center">
    <h2 className="v1">Incoming call, from..</h2>
    <h2 className="f1">{currentEvent.callerId || `???`}</h2>
  </div>)
  }

  const handleMessage = at => {
    console.log(`Received message '${at}' from server`);
    
    at.split(" ").forEach(word => {
      if(controller[word]){
        controller[word](at);
      }
    });
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
    return () => console.log('unmounting')
  }, [handleMessage]);


  console.log("currentevent",currentEvent)

  return (
    <div className="w-screen h-screen bg-black text-white overflow-hidden">
      <section className="grid">
        {eventJSX[currentEvent.key] || (<div className="grid-end-12 flex justify-center">
          <Button fontClass="v1" text="Phone" />
        </div>)}
      </section>
    </div>
  );
};

export default App;
