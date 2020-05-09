import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const useKeyPress = function (targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
};

const items = [
  { id: 0, name: "Savan Nahar" },
  { id: 1, name: "Josh Weir" },
  { id: 2, name: "Sarah Weir" },
  { id: 3, name: "Alicia Weir" },
  { id: 4, name: "Doo Weir" },
  { id: 5, name: "Grooft Weir" },
  { id: 6, name: "Josh Weir" },
  { id: 7, name: "Sarah Weir" },
  { id: 8, name: "Alicia Weir" },
  { id: 9, name: "Doo Weir" },
  { id: 10, name: "Grooft Weir" },
];

const ListItem = ({ id, item, active, setSelected, setHovered }) => (
  <div
    id={`clip_${id}`}
    className={`item ${active ? "active" : ""}`}
    onClick={() => setSelected(item)}
    onMouseEnter={() => setHovered(item)}
    onMouseLeave={() => setHovered(undefined)}
  >
    {item.name}
  </div>
);

const App = () => {
  const [selected, setSelected] = useState(undefined);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);

  useEffect(() => {
    setSelected(items[0]);
    document.getElementById("clipHistory").focus();
  }, []);

  useEffect(() => {
    if (items.length && downPress) {
      setCursor((prevState) =>
        prevState < items.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress]);
  useEffect(() => {
    if (items.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);
  useEffect(() => {
    if (items.length && enterPress) {
      setSelected(items[cursor]);
    }
  }, [cursor, enterPress]);
  useEffect(() => {
    if (items.length && hovered) {
      setCursor(items.indexOf(hovered));
    }
  }, [hovered]);

  return (
    <div style={{ overflow: "hidden" }}>
      <p>
        <small>
          Use up down keys and hit enter to copy text to clipboard, or use the
          mouse
        </small>
      </p>
      <span>Selected: {selected ? selected.name : "none"}</span>
      <div
        tabIndex="0"
        id="clipHistory"
        style={{ overflowY: "auto", height: "300px" }}
      >
        {items.map((item, i) => (
          <ListItem
            key={item.id}
            active={i === cursor}
            item={item}
            setSelected={setSelected}
            setHovered={setHovered}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
