import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className='chatbar'>
        <input
          className='chatbar-username'
          defaultValue={this.props.currentUser.name}
          onKeyPress={(e)=>this.props.changeUsername(e)}
          placeholder='Your Name (Optional)'
        />
        <input
          className='chatbar-message'
          placeholder='Type a message and hit ENTER'
          onKeyPress={(e)=>this.props.addMessage(e)}
        />
      </footer>
    );
  }
}

export default ChatBar;
