import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { w3cwebsocket as W3CWebSocket } from "websocket";
const server = new W3CWebSocket(`ws://127.0.0.1:8000`);

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [currentEvent, setCurrentEvent] = useState({});
  const [dial, setDial] = useState(``);

  useEffect(() => {
    server.onopen = () => {
      server.onmessage = (message) => {
        if (message?.data) {
          const { at } = JSON.parse(message.data);
          console.log(`Received message '${at}' from server`);

          if (controller[at]) {
            controller[at](at); // call function if whole AT is a valid key,
          } else {
            at.split(" ").forEach((word) => {
              if (controller[word]) {
                controller[word](at); // or a single word from the AT line split
              }
            });
          }
        }
      };
    };
  }, []);

  //

  const controller = {
    RING: (at) => {
      setCurrentEvent({ key: "CALL_INCOMING", at });
    },
    "+CLIP:": (at) => {
      setCurrentEvent((oldCurrentEvent) => ({
        ...oldCurrentEvent,
        callerId: at.split(` `)[1],
      }));
    },
    "VOICE CALL: BEGIN": () => {
      //TODO: is this the right command?
      setCurrentEvent((oldCurrentEvent) => ({
        key: "CALL_ACTIVE",
        callerId: oldCurrentEvent.callerId,
      }));
    },
    "VOICE CALL: END": () => {
      //TODO: is this the right command?
      setCurrentEvent({});
    },
  };

  // CALL FUNCTIONS -->

  const answerCall = () => server.send(`ATA`);

  const hangUpCall = () => server.send(`AT+CHUP`);

  const makeCall = () => server.send(`ATD${dial};`);

  //

  return (
    <AppContext.Provider
      value={{
        controller,
        currentEvent,
        answerCall,
        hangUpCall,
        makeCall,
        dial,
        setDial,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
