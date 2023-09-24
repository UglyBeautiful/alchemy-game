import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./DragMove.css";

export default function DragMove(props) {
  const [previousTouch, setNewTouch] = useState({ clientX: 0, clientY: 0 });

  const [position, setNewPosition] = useState({
    top: 0 + "px",
    left: 0 + "px",
  });

  function updateElementPosition(element, event) {
    var movementX, movementY;

    if (event.type === "touchmove") {
      const touch = event.touches[0];
      movementX = previousTouch ? touch.clientX - previousTouch.clientX : 0;
      movementY = previousTouch ? touch.clientY - previousTouch.clientY : 0;
      setNewTouch(touch);
    } else {
      movementX = event.movementX;
      movementY = event.movementY;
    }
    console.log(position.top + " pos elemstyle " + element.style.top);
    const elementY = parseInt(element.style.top) + movementY;
    const elementX = parseInt(element.style.left) + movementX;

    // props.overflowCheck(elementX, elementY)
    setNewPosition({ top: `${elementY}px`, left: `${elementX}px` });
    // element.style.top = `${elementY}px`;
    // element.style.left = `${elementX}px`;
  }

  //START DRAGGING PHOTOS
  function startDrag(element, event) {
    const updateFunction = (event) => {
      console.log(1);
      event.preventDefault();
      updateElementPosition(element, event);
    };
    const stopFunction = () =>
      stopDrag({ update: updateFunction, stop: stopFunction });
    document.addEventListener("mousemove", updateFunction);
    document.addEventListener("touchmove", updateFunction);
    document.addEventListener("mouseup", stopFunction);
    document.addEventListener("touchend", stopFunction);
  }

  // STOP DRAGGIN PHOTOS
  function stopDrag(functions) {
    setNewTouch(undefined);
    document.removeEventListener("mousemove", functions.update);
    document.removeEventListener("touchmove", functions.update);
    document.removeEventListener("mouseup", functions.stop);
    document.removeEventListener("touchend", functions.stop);
  }

  const startFunction = (event) => startDrag(event.target, event);

  return (
    <div children={props.children}>
      <img
        style={position}
        src={props.logo}
        className="drag-elem"
        onMouseDown={startFunction}
        onTouchStart={startFunction}
      />
    </div>
  );
}
