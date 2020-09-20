import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import moment from "moment";
import Button from "./Button";

const IncomingCallScreen = ({ className }) => {
  const { currentEvent, hangUpCall } = useContext(AppContext);
  const [startTime] = useState(moment(new Date()));
  const [counter, setCounter] = useState(`00:00:00`);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const nowTime = moment(new Date());
      const diffTime = moment.utc(nowTime.diff(startTime));
      setCounter(diffTime.format("HH:mm:ss"));
    }, 1000);

    return () => {
      console.log("clearing!");
      clearInterval(timeInterval);
    };
  }, []);

  console.log("counter", counter);

  return (
    <div className={className}>
      <h2 className="v1">You're talking to</h2>
      <h2 className="f1 italic">{currentEvent?.callerId || `???`}</h2>
      <p className="b1">{counter}</p>
      <Button fontClass="w-content f5" onClick={hangUpCall} text="fuck off" />
    </div>
  );
};

export default IncomingCallScreen;
