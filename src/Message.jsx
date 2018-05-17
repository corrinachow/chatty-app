import React, { Component } from 'react';

class Message extends Component {
  render() {

    // Funnels incoming messages
    if (this.props.message.type === 'incomingMessage') {
      const nameStyle = {color: this.props.message.username.colour}
      return (
        <div className='message'>
          <span className='message-username' style={nameStyle}>
            {this.props.message.username.name}
          </span>
          <span className='message-content'>{this.props.message.content}</span>
        </div>
      );

    // Funnels notifications
    } else if (this.props.message.type === 'incomingNotification') {
      return (
        <div className='notification'>
          <span className='notification-content'>
            {this.props.message.content}
          </span>
        </div>
      );
    }
  }
}

export default Message;