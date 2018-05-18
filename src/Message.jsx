import React, { Component } from 'react';

class Message extends Component {
  render() {

    // Funnels incoming messages
    if (this.props.message.type === 'incomingMessage') {
      const imgHtml = this.props.message.img_url ? `<img src="${this.props.message.img_url}">` : ''
      const message = this.props.message.content + imgHtml;
      const nameStyle = {color: this.props.message.username.colour}
      return (
        <div className='message'>
          <span className='message-username' style={nameStyle}>
            {this.props.message.username.name}
          </span>
          <span className='message-content' dangerouslySetInnerHTML={{__html: message}}></span>
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