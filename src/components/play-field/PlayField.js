import React, { useState, useRef, useEffect } from "react";
import DragMove from "./DragMove/DragMove";
import logo from "../nazouvaky-freedom-moses-fancy-ikat-sands.jpg";
import "./PlayField.css";

export default function PlayField() {
  const pfRef = useRef(null);
  let rect = undefined;

  React.useEffect(() => {
    rect = pfRef.current.getBoundingClientRect();
  });

  function overflowCheck(elemX, elemY) {
    if (
      rect.top > elemY ||
      rect.bottom < elemY ||
      rect.left > elemX ||
      rect.right < elemX
    ) {
      console.log(rect.left, elemX);
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className="play-field" ref={pfRef}>
      <DragMove logo={logo} overflowCheck={overflowCheck}></DragMove>
    </div>
  );
}
