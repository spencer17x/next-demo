"use client";
import { useMount } from "ahooks";
import { memo, useState } from "react";

const A = () => {
  console.log("render A");

  return <div>A</div>;
};

const B = memo(function B() {
  console.log("render B");

  return <div>B</div>;
});

B.displayName = "B";

function App() {
  const [timestamp] = useState(Date.now())
  const [count, setCount] = useState(0);
  console.log("render App", timestamp);

  useMount(() => {
    console.log("useMount", Date.now());
  })

  return (
    <div>
      <div onClick={() => setCount(count + 1)}>App: {count}</div>
      <A />
      <B />
    </div>
  );
}

export default App;
