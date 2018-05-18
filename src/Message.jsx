import React, { Component } from 'react';

class Message extends Component {
  render() {
    // Search for .gif|.png|.jpg
    const imgUrls = this.props.message.content.match(
      /\b(https?:\/\/\S+(?:png|jpe?g|gif)\S*)\b/gim
    );

    // Funnels incoming messages
    if (this.props.message.type === 'incomingMessage') {
      // Parse image Urls
      const imgHtml = imgUrls
        ? imgUrls.map(imgUrl => `<img src="${imgUrl}">`).join('')
        : '';

      // Parse message
      const message = imgUrls
        ? this.props.message.content
            .split(' ')
            .filter(group => imgUrls.indexOf(group) === -1)
            .join(' ')
        : this.props.message.content;

      // Consolidate message HTML to be sent
      const messageHtml = message + imgHtml;
      const nameStyle = { color: this.props.message.username.colour };
      return (
        <div className='message'>
          <span className='message-username' style={nameStyle}>
            {this.props.message.username.name}
          </span>
          <span
            className='message-content'
            dangerouslySetInnerHTML={{ __html: messageHtml }}
          />
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
