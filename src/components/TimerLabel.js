import React from "react";
import { connect } from "react-redux";
import {
  decrementSessionTimer,
  decrementBreakTimer,
  sessionCompleted,
  breakCompleted,
  resetEverything,
} from "../actions";

class TimerLabel extends React.Component {
  constructor(props) {
    super(props);
    this.isTimerOn = false;
    this.isBreakTimerOn = false;
  }

  componentDidUpdate() {
    const beep = document.querySelector("#beep");
    if (this.props.breakTimeLeft < 10 || this.props.sessionTimeLeft < 10) {
      document.querySelector("#time-left").style.color = "#e74c3c";
    } else {
      document.querySelector("#time-left").style.color = "#080a1f";
    }

    if (this.props.sessionTimeLeft < 0) {
      beep.play();
      clearInterval(this.sessionTimer);
      this.isTimerOn = false;
      this.props.sessionCompleted();
      this.toggleBreakTimer();
    }
    if (this.props.breakTimeLeft < 0) {
      beep.play();
      clearInterval(this.breakTimer);
      this.isBreakTimerOn = false;
      this.props.breakCompleted();
      this.toggleSessionTimer();
    }
  }

  toggleSessionTimer() {
    this.isTimerOn = !this.isTimerOn;
    const stopStart = document.querySelector("#start-stop");
    if (this.isTimerOn) {
      stopStart.classList.remove("fa-play");
      stopStart.classList.add("fa-pause");
      this.sessionTimer = setInterval(() => {
        this.props.decrementSessionTimer();
      }, 1000);
    } else {
      stopStart.classList.add("fa-play");
      stopStart.classList.remove("fa-stop");
      if (!this.sessionTimer) return;
      clearInterval(this.sessionTimer);
    }
  }

  toggleBreakTimer() {
    this.isBreakTimerOn = !this.isBreakTimerOn;
    const stopStart = document.querySelector("#start-stop");

    if (this.isBreakTimerOn) {
      stopStart.classList.remove("fa-play");
      stopStart.classList.add("fa-pause");
      this.breakTimer = setInterval(() => {
        this.props.decrementBreakTimer();
      }, 1000);
    } else {
      stopStart.classList.add("fa-play");
      stopStart.classList.remove("fa-stop");
      if (!this.breakTimer) return;
      clearInterval(this.breakTimer);
    }
  }

  handleReset() {
    this.props.resetEverything();

    this.breakTimer && clearInterval(this.breakTimer);
    this.sessionTimer && clearInterval(this.sessionTimer);
    document.querySelector("#beep").load();
    document.querySelector("#start-stop").classList.add("fa-play");
    document.querySelector("#start-stop").classList.remove("fa-stop");
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
            <i
              className="fas fa-sync-alt fa-2x control"
              id="reset"
              onClick={() => this.handleReset()}
            ></i>
          </div>
        </div>
        <audio
          id="beep"
          src="https://drive.google.com/uc?export=download&id=15EifkmEZ7mzmVp0ao5ZDBJqp3oVblIJg"
        ></audio>
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
  resetEverything,
})(TimerLabel);
