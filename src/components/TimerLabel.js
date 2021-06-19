import React from "react";
import { connect } from "react-redux";
import {
  decrementSessionTimer,
  decrementBreakTimer,
  sessionCompleted,
  breakCompleted,
} from "../actions";

class TimerLabel extends React.Component {
  constructor(props) {
    super(props);
    this.isTimerOn = false;
    this.isBreakTimerOn = false;
  }

  componentDidUpdate() {
    if (this.props.sessionTimeLeft === 0) {
      clearInterval(this.sessionTimer);
      this.isTimerOn = false;
      this.props.sessionCompleted();
      this.toggleBreakTimer();
    }
    if (this.props.breakTimeLeft === 0) {
      clearInterval(this.breakTimer);
      this.isBreakTimerOn = false;
      this.props.breakCompleted();
      this.toggleSessionTimer();
    }
  }

  toggleSessionTimer() {
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

  toggleBreakTimer() {
    this.isBreakTimerOn = !this.isBreakTimerOn;

    if (this.isBreakTimerOn) {
      this.breakTimer = setInterval(() => {
        this.props.decrementBreakTimer();
      }, 1000);
    } else {
      if (!this.breakTimer) return;
      clearInterval(this.breakTimer);
    }
  }

  render() {
    const event = this.props.ongoingEvent;

    const sessionTimeLeft = this.props.sessionTimeLeft;
    const breakTimeLeft = this.props.breakTimeLeft;

    const min =
      event === "session"
        ? String(Math.floor(sessionTimeLeft / 60)).padStart(2, 0)
        : String(Math.floor(breakTimeLeft / 60)).padStart(2, 0);

    const sec =
      event === "session"
        ? String(sessionTimeLeft % 60).padStart(2, 0)
        : String(breakTimeLeft % 60).padStart(2, 0);

    return (
      <div className="container timer-label my-5" id="timer-label">
        {event === "session" ? <h2>Session</h2> : <h2>Break</h2>}

        <h1 id="time-left">
          {min}:{sec}
        </h1>
        <div className="controls-container row">
          <div className="col  ">
            <i
              className="fas fa-play fa-2x control"
              id="start-stop"
              onClick={() => {
                event === "session"
                  ? this.toggleSessionTimer()
                  : this.toggleBreakTimer();
              }}
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
    sessionTimeLeft: state.sessionTimeLeft,
    ongoingEvent: state.onGoingEvent,
    breakTimeLeft: state.breakTimeLeft,
  };
};

export default connect(mapStateToProps, {
  decrementSessionTimer,
  decrementBreakTimer,
  sessionCompleted,
  breakCompleted,
})(TimerLabel);
