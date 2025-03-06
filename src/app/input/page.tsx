"use client";
import { useRef, useState } from "react";

const App = () => {
  const textRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("hello world");

  return (
    <div>
      <h1>InputDemo</h1>
      <div>
        <input
          ref={inputRef}
          style={{
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
          // type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <input style={{width: 0}} ref={textRef} value={value} type="search" />
      </div>
      <button
        onClick={() => {
          const width = textRef.current?.scrollWidth || 0;
          console.log("text width", width);
          inputRef.current!.style.width = `${width}px`;
        }}
      >
        Click
      </button>
    </div>
  );
};

export default App;
