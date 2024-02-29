import React, { useEffect, useState } from "react";

const App = () => {
  const [streamedText, setStreamedText] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3005/stream-file");

    eventSource.onmessage = (event) => {
      console.log(event.data);
      setStreamedText((prevText) => prevText + event.data);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Streaming File Content</h1>
      <div>{streamedText}</div>
    </div>
  );
};

export default App;
