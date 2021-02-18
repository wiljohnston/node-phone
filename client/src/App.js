import React, { useContext, useEffect, useState } from "react";
import Button from "./components/Button";
import IncomingCallScreen from "./components/IncomingCallScreen";
import ActiveCallScreen from "./components/ActiveCallScreen";
import Scrambler from "./components/Scrambler";
import { AppContext } from "./context/AppContext";
import getRandomNumber from "./utils/getRandomNumber";

const App = () => {
  const { currentEvent, dial, setDial, makeCall } = useContext(AppContext);
  const [scramblerIterations, setScramberIterations] = useState(2);

  console.log(currentEvent);

  const eventJSX = {
    CALL_INCOMING: (
      <IncomingCallScreen className="grid-end-12 flex flex-col justify-around" />
    ),
    CALL_ACTIVE: (
      <ActiveCallScreen className="grid-end-12 flex flex-col justify-around" />
    ),
  };

  return (
    <div
      style={{ transform: "rotate(90deg)" }}
      className="w-screen h-screen bg-black text-white overflow-visible noselect"
    >
      <section className="grid">
        {eventJSX[currentEvent?.key] || (
          <>
            <div className="grid-end-12 flex justify-center">
              <Button fontClass="v1" text="Phone" />
            </div>

            <div className="grid-end-12 flex flex-col items-center justify-between">
              <p style={{ minHeight: "50px" }} className="f5">
                <Scrambler text={dial} iterations={scramblerIterations} />
              </p>

              <ul className="flex flex-wrap justify-center">
                {new Array(9).fill(null).map((_, number) => (
                  <li
                    className="w-1/3 flex items-center justify-center f3"
                    key={`number_${number + 1}`}
                  >
                    <Button
                      className="w-full h-full f2"
                      text={`${number + 1}`}
                      onClick={() => {
                        setDial((oldNumber) => `${oldNumber}${number + 1}`);
                      }}
                    />
                  </li>
                ))}

                <li className="w-1/3 flex items-center justify-center f3">
                  <Button
                    className="w-full h-full f4"
                    onClick={() => {
                      setDial(getRandomNumber());
                    }}
                  >
                    ?
                  </Button>
                </li>

                <li className="w-1/3 flex items-center justify-center f3">
                  <Button
                    className="w-full h-full f2"
                    text={`0`}
                    onClick={() => {
                      setDial((oldNumber) => `${oldNumber}${0}`);
                    }}
                  />
                </li>

                <li className="w-1/3 flex items-center justify-center">
                  <Button
                    className="w-full h-full px-6 f4"
                    onClick={() => {
                      setDial((oldNumber) => oldNumber.slice(0, -1));
                    }}
                  >
                    X
                  </Button>
                </li>
              </ul>
            </div>

            <div className="h-full grid-end-12 flex flex-col justify-center items-center mt-2">
              <Button
                onClick={() => {
                  makeCall();
                  setScramberIterations(2000);
                  setTimeout(() => {
                    setScramberIterations(2);
                  }, 1000 * 10);
                }}
                className="f3 pt-2 pb-1 px-8 border-thick border-white border-dotted"
                text="dial it!"
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default App;
