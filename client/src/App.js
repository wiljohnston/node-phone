import React, { useContext } from "react";
import Button from "./components/Button";
import IncomingCallScreen from "./components/IncomingCallScreen";
import ActiveCallScreen from "./components/ActiveCallScreen";
import Cross from "./components/svg/Cross";
import { AppContext } from "./context/AppContext";
import getRandomNumber from "./utils/getRandomNumber";

const App = () => {
  const { currentEvent, dial, setDial, makeCall } = useContext(AppContext);

  const eventJSX = {
    CALL_INCOMING: (
      <IncomingCallScreen className="grid-end-12 flex flex-col justify-around" />
    ),
    CALL_ACTIVE: (
      <ActiveCallScreen className="grid-end-12 flex flex-col justify-around" />
    ),
  };

  return (
    <div className="w-screen h-screen bg-black text-white overflow-hidden noselect">
      <section className="grid">
        {eventJSX[currentEvent?.key] || (
          <>
            <div className="grid-end-12 flex justify-center">
              <Button fontClass="v1" text="Phone" />
            </div>

            <ul className="grid-end-4 grid-start-5 flex flex-wrap justify-center">
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

              <li className="w-1/3 flex items-center justify-center f3">
                <Button
                  className="w-full h-full px-6 f2"
                  onClick={() => {
                    setDial((oldNumber) => oldNumber.slice(0, -1));
                  }}
                >
                  <Cross className="w-full" color="white" />
                </Button>
              </li>
            </ul>

            <div className="h-full grid-end-3 flex flex-col justify-end">
              <p className="mb-10 f5">{dial}</p>

              <Button onClick={makeCall} className="f3" text="dial it!" />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default App;
