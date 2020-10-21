import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

export default class StepProgressBar extends React.Component {
  render() {
    const { percentComplete } = this.props;
    return (
      <ProgressBar
        percent={percentComplete}
        filledBackground="linear-gradient(to right, #8DB2D1, #3E99E5)" />
    );
  }
}