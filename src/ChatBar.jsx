import React, { Component } from "react";

class ChatBar extends Component {
  handleKeypress(e) {
    if (e.key === "Enter") {
      console.log(e.target.value)
      this.props.addMessage(e.target.value);
      e.target.value = "";
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          defaultValue={this.props.currentUser.name}
          placeholder="Your Name (Optional)"
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.handleKeypress.bind(this)}
        />
      </footer>
    );
  }
}

export default ChatBar;
