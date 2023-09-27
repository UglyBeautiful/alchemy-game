import React, { useState, useRef, useEffect } from "react";
import DragMove from "./DragMove/DragMove";
import logo from "../nazouvaky-freedom-moses-fancy-ikat-sands.jpg";
import "./PlayField.css";

export default function PlayField() {
  const pfRef = useRef(null);
  let rect = undefined;

  useEffect(() => {
    if (pfRef.current) {
      rect = pfRef.current.getBoundingClientRect();
    }
  }, []);

  // function overflowCheck(dmCoord, axis) {
  //   switch (axis) {
  //     case "X":
  //       return rect.left < dmCoord.left && rect.right > dmCoord.right;
  //     case "Y":
  //       console.log(rect.top, dmCoord.top);
  //       if (rect.top < dmCoord.top && rect.bottom > dmCoord.bottom){

  //       };
  //     default:
  //       console.log("axis error");
  //   }

  // }

  return (
    <div className="play-field" ref={pfRef}>
      <DragMove logo={logo} borders={rect}></DragMove>
      <DragMove logo={logo} borders={rect}></DragMove>
      <DragMove logo={logo} borders={rect}></DragMove>
      <DragMove logo={logo} borders={rect}></DragMove>
    </div>
  );
}
