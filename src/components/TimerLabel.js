import React from "react";
import { connect } from "react-redux";

class TimerLabel extends React.Component {
  render() {
    const sessionTimeLeft = this.props.sessionTimeLeft;
    const min = String(Math.floor(sessionTimeLeft / 60)).padStart(2, 0);
    const sec = String(sessionTimeLeft % 60).padStart(2, 0);

    return (
      <div className="container timer-label my-5" id="timer-label">
        <h2>Session</h2>
        <h1>
          {min}:{sec}
        </h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sessionTimeLeft: state.timeLeft,
  };
};

export default connect(mapStateToProps)(TimerLabel);
