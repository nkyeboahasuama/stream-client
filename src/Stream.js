import React, { useEffect, useState } from "react";

const App = () => {
  const [streamedText, setStreamedText] = useState("");
  const [stopStreaming, setStopStreaming] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3005/stream-file");

    eventSource.onmessage = (event) => {
      setStreamedText((prev) => prev + event.data);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleStopStreaming = () => {
    setStopStreaming(true);
  };
  return (
    <div style={{ width: "90vw" }}>
      <h1 style={{ whiteSpace: "pre-line" }}>Streaming File Content</h1>
      <div>
        <p>{streamedText}</p>
        <hr />
      </div>
      <button onClick={handleStopStreaming}>Stop</button>
    </div>
  );
};

export default App;
