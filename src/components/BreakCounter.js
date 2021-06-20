import React from "react";
import { connect } from "react-redux";
import {
  incrementBreakLength,
  decrementBreakLength,
  breakLengthChanged,
} from "../actions";

class BreakCounter extends React.Component {
  handleUpClick() {
    if (this.props.breakLength >= 60) {
      return;
    }

    this.props.incrementBreakLength();
    this.props.breakLengthChanged();
  }

  handleDownClick() {
    if (this.props.breakLength <= 1) {
      return;
    }
    this.props.decrementBreakLength();
    this.props.breakLengthChanged();
  }

  render() {
    return (
      <div className="container counter-container">
        <h3 className="text-center" id="break-label">
          Break Length
        </h3>
        <div className="row">
          <div className="col-2 counter-icon">
            <i
              className="fas fa-arrow-up counter-arrows"
              id="break-increment"
              onClick={this.handleUpClick.bind(this)}
            ></i>
          </div>
          <div className="col-8 text-center" id="break-length">
            {this.props.breakLength}
          </div>
          <div className="col-2 counter-icon">
            <i
              className="fas fa-arrow-down counter-arrows"
              id="break-decrement"
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
    breakLength: state.breakLength,
  };
};

export default connect(mapStateToProps, {
  incrementBreakLength,
  decrementBreakLength,
  breakLengthChanged,
})(BreakCounter);
