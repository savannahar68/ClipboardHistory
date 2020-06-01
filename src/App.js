import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const ipcRenderer = window.require("electron").ipcRenderer;

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
    return eventListener(downHandler, upHandler);
  });

  return keyPressed;
};

const eventListener = (downHandler, upHandler) => {
  window.addEventListener("keydown", downHandler);
  window.addEventListener("keyup", upHandler);
  return () => {
    window.removeEventListener("keydown", downHandler);
    window.removeEventListener("keyup", upHandler);
  };
};

const ListItem = ({ id, item, active, setSelected, setHovered }) => {
  return (
    <div
      id={`clip_${id}`}
      width="100%"
      className={`item ${active ? "active" : ""}`}
      onClick={() => {
        //setSelected(item);
        invokeCopyClipboard(item);
      }}
      onMouseEnter={() => setHovered(item)}
      onMouseLeave={() => setHovered(undefined)}
    >
      {item.name}
    </div>
  );
};

// This array will have list of object of clips
var items = [];

const invokeCopyClipboard = (clip) => {
  ipcRenderer.invoke("setClipboard", clip);
};

const App = () => {
  //const [selected, setSelected] = useState(undefined);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);

  useEffect(() => {
    ipcRenderer.on("clipboardContents", (event, message) => {
      items = [];
      message.forEach((element, index) => {
        items.push({ id: index + 10, name: element });
      });
      //setSelected(items[0]);
      setHovered(items[0]);
      document.getElementById("clipHistory").focus();
    });
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
      //setSelected(items[cursor]);
      //ipcRenderer.invoke("setClipboard", items[cursor]);
      invokeCopyClipboard(items[cursor]);
    }
  }, [cursor, enterPress]);
  useEffect(() => {
    if (items.length && hovered) {
      setCursor(items.indexOf(hovered));
    }
  }, [hovered]);

  return (
    <div style={{ overflow: "none", position: "fixed" }}>
      <p>
        Tip: {/* <small> */}
        Use UP DOWN arrow keys and hit enter to copy text to clipboard, or use
        the mouse.
        {/* </small> */}
      </p>
      {/* <span>
        Selected:{" "}
        {selected
          ? selected.name.length > 100
            ? selected.name.substring(0, 100) + "..."
            : selected.name
          : "none"}
      </span> */}
      <div
        tabIndex="0"
        id="clipHistory"
        style={{
          overflowY: "auto",
          height: "330px",
          paddingBottom: "5px",
          paddingTop: "5px",
        }}
      >
        {items.map((item, i) => (
          <ListItem
            key={item.id}
            active={i === cursor}
            item={item}
            // setSelected={setSelected}
            setHovered={setHovered}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
