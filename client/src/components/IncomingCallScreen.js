import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Button from "./Button";

const IncomingCallScreen = ({ className }) => {
  const { currentEvent, answerCall, hangUpCall } = useContext(AppContext);

  return (
    <div className={className}>
      <h2 className="v1">Incoming call, from..</h2>
      <h2 className="f1">{currentEvent?.callerId || `???`}</h2>
      <p>Will you answer?</p>
      <Button fontClass="w-content f5" onClick={answerCall} text="yes" />
      <Button fontClass="w-content f5" onClick={hangUpCall} text="no" />
    </div>
  );
};

export default IncomingCallScreen;
