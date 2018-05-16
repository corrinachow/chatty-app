import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <div className="notification">
        <span className="notification-content">
          {this.props.content}
        </span>
      </div>
    );
  }
}

export default Message;
