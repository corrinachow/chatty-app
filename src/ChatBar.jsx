import React, { Component } from "react";

class ChatBar extends Component {
  enterMessage(e) {
    if (e.key === "Enter") {
      this.props.addMessage(e.target.value);
      e.target.value = "";
    }
  }
  changeUsername(e) {
    if (e.key === "Enter") {
      this.props.changeUsername(e.target.value);
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          defaultValue={this.props.currentUser.name}
          onKeyPress={this.changeUsername.bind(this)}
          placeholder="Your Name (Optional)"
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.enterMessage.bind(this)}
        />
      </footer>
    );
  }
}

export default ChatBar;
