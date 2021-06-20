import React from "react";
import { connect } from "react-redux";
import {
  incrementSessionLength,
  decrementSessionLength,
  sessionLengthChanged,
} from "../actions";

class SessionCounter extends React.Component {
  handleUpClick() {
    if (this.props.sessionLength >= 60) {
      return;
    }
    this.props.incrementSessionLength();
    this.props.sessionLengthChanged();
  }

  handleDownClick() {
    if (this.props.sessionLength <= 1) {
      return;
    }
    this.props.decrementSessionLength();
    this.props.sessionLengthChanged();
  }

  render() {
    return (
      <div className="container counter-container">
        <h3 className="text-center" id="session-label">
          Session Length
        </h3>
        <div className="row">
          <div className="col-2 counter-icon">
            <i
              className="fas fa-arrow-up counter-arrows"
              id="session-decrement"
              onClick={this.handleUpClick.bind(this)}
            ></i>
          </div>
          <div className="col-8 text-center" id="session-length">
            {this.props.sessionLength}
          </div>
          <div className="col-2 counter-icon">
            <i
              className="fas fa-arrow-down counter-arrows"
              id="session-decrement"
              onClick={this.handleDownClick.bind(this)}
            ></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sessionLength: state.sessionLength,
  };
};

export default connect(mapStateToProps, {
  incrementSessionLength,
  decrementSessionLength,
  sessionLengthChanged,
})(SessionCounter);
