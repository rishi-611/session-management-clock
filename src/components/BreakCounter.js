import React from "react";
import { connect } from "react-redux";
import { incrementBreakLength, decrementBreakLength } from "../actions";

class BreakCounter extends React.Component {
  handleUpClick() {
    if (this.props.breakLength >= 60) {
      return;
    }

    this.props.incrementBreakLength();
  }

  handleDownClick() {
    if (this.props.breakLength <= 1) {
      return;
    }
    this.props.decrementBreakLength();
  }

  render() {
    return (
      <div className="container counter-container">
        <h3 className="text-center">Break Length</h3>
        <div className="row">
          <div
            className="col-2 counter-icon"
            onClick={this.handleUpClick.bind(this)}
          >
            <i className="fas fa-arrow-up"></i>
          </div>
          <div className="col-8 text-center">{this.props.breakLength}</div>
          <div
            className="col-2 counter-icon"
            onClick={this.handleDownClick.bind(this)}
          >
            <i className="fas fa-arrow-down"></i>
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
})(BreakCounter);
