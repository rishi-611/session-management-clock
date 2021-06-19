import React from "react";
import "../css/App.css";
import BreakCounter from "./BreakCounter";
import SessionCounter from "./SessionCounter";
import TimerLabel from "./TimerLabel";

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="counters-grid-container my-2 mt-4 container">
          <BreakCounter />
          <SessionCounter />
        </div>
        <TimerLabel />
      </div>
    );
  }
}

export default App;
