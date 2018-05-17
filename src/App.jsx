import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      messages: [],
      activeUsers: 0,
      users: []
    };
    this.changeUsername = this.changeUsername.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    // Listens for new messages
    this.socket.onmessage = event => {
      let data = JSON.parse(event.data);

      switch (data.type) {
        // Handles incoming messages & notifications with same state
        case 'incomingMessage' || 'incomingNotification':
          this.setState(previousState => ({
            messages: [...previousState.messages, data]
          }));
          break;
        case 'deltaClient':
          this.setState(() => ({
            activeUsers: data.clients
          }));
          break;

        // Sets currentUser
        case 'newClient':
          this.setState(() => ({
            currentUser: data
          }));
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + data.type);
      }
    };
  }

  changeUsername(e) {
    if (e.key === 'Enter') {
      const { currentUser } = this.state;
      const newUsername = { name: e.target.value, colour: currentUser.colour };
      const notification = {
        type: 'postNotification',
        content: `${currentUser.name} has changed their name to ${
          newUsername.name
        }`
      };
      this.socket.send(JSON.stringify(notification));
      this.setState({ currentUser: newUsername });
    }
  }

  addMessage(e) {
    if (e.key === 'Enter') {
      const { currentUser } = this.state;
      const newMessage = {
        type: 'postMessage',
        username: currentUser,
        colour: currentUser.colour,
        content: e.target.value
      };
      this.socket.send(JSON.stringify(newMessage));
      e.target.value = '';
    }
  }

  render() {
    return (
      <div>
        <Navbar users={this.state.activeUsers} />
        <MessageList messages={this.state.messages} />
        <ChatBar
          addMessage={this.addMessage}
          currentUser={this.state.currentUser}
          changeUsername={this.changeUsername}
        />
      </div>
    );
  }
}

export default App;
