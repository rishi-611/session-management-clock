import React from "react";
import { connect } from "react-redux";
import { decrementSessionTimer, sessionCompleted } from "../actions";

class TimerLabel extends React.Component {
  constructor(props) {
    super(props);
    this.isTimerOn = false;
  }

  componentDidUpdate() {
    if (this.props.sessionTimeLeft === 0) {
      clearInterval(this.sessionTimer);
      this.isTimerOn = false;
      this.props.sessionCompleted();
    }
  }

  toggleTimer() {
    this.isTimerOn = !this.isTimerOn;
    if (this.isTimerOn) {
      this.sessionTimer = setInterval(() => {
        this.props.decrementSessionTimer();
      }, 1000);
    } else {
      if (!this.sessionTimer) return;
      clearInterval(this.sessionTimer);
    }
  }

  render() {
    const sessionTimeLeft = this.props.sessionTimeLeft;
    const min = String(Math.floor(sessionTimeLeft / 60)).padStart(2, 0);
    const sec = String(sessionTimeLeft % 60).padStart(2, 0);

    return (
      <div className="container timer-label my-5" id="timer-label">
        <h2>Session</h2>
        <h1 id="time-left">
          {min}:{sec}
        </h1>
        <div className="controls-container row">
          <div className="col  ">
            <i
              className="fas fa-play fa-2x control"
              id="start-stop"
              onClick={() => this.toggleTimer()}
            ></i>
          </div>
          <div className="col">
            <i className="fas fa-sync-alt fa-2x control" id="reset"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sessionTimeLeft: state.timeLeft,
  };
};

export default connect(mapStateToProps, {
  decrementSessionTimer,
  sessionCompleted,
})(TimerLabel);
