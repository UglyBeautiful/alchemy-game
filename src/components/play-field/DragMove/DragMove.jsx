import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./DragMove.css";

const getCoords = (ref) => {
  return ref.current.getBoundingClientRect();
};

export default function DragMove(props) {
  const [previousTouch, setNewTouch] = useState({ clientX: 0, clientY: 0 });

  const dmRef = useRef(null);
  let dmCoord = undefined;

  const [coords, setCoords] = useState(null);

  const [positionY, setNewPositionY] = useState(100);
  const [positionX, setNewPositionX] = useState(100);

  // useEffect(() => {
  //   dmCoord = dmRef.current.getBoundingClientRect();
  //   console.log(dmCoord);
  //   setCoords({
  //     top: dmCoord.top,
  //     bottom: dmCoord.bottom,
  //     left: dmCoord.left,
  //     right: dmCoord.right,
  //   });
  // }, [positionX, positionY]);

  useEffect(() => {
    dmCoord = dmRef.current.getBoundingClientRect();
  }, []);

  const positionSetting = (prev, movement) => {
    const borders = props.borders;
    setCoords(getCoords(dmRef));
    console.log(borders.top, coords.top);
    if (borders.top > coords.top) {
      return borders.top;
    } else if (borders.bottom < coords.bottom) {
      return borders.bottom;
    } else if (borders.left > coords.left) {
      return borders.left;
    } else if (borders.right < coords.right) {
      return borders.right;
    } else {
      return prev + movement;
    }
  };

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
    // const elementY = parseInt(element.style.top) + movementY;
    // const elementX = parseInt(element.style.left) + movementX;

    setNewPositionY((prev) => positionSetting(prev, movementY));
    setNewPositionX((prev) => positionSetting(prev, movementX));
  }

  //START DRAGGING PHOTOS
  function startDrag(element, event) {
    const updateFunction = (event) => {
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
    <div
      style={{ top: positionY, left: positionX }}
      className="drag-elem"
      children={props.children}
      ref={dmRef}
      onMouseDown={startFunction}
      onTouchStart={startFunction}
    >
      <img src={props.logo} />
    </div>
  );
}
