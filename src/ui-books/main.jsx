import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>{time}</h1>
    </div>
  );
};

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Clock />
  </React.StrictMode>
);
