import React, { Component } from "react";
import Message from "./Message.jsx";
import Notification from "./Notification.jsx";

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {(this.props.messages).map(message => (
          <Message key={message.id} username={message.username} content={message.content} />
        ))}
        {(this.props.notifications).map(notification => (
          <Notification key={notification.id} content={notification.content} />
        ))}
      </main>
    );
  }
}

export default MessageList;

