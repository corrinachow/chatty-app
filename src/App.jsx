import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" },
      messages: []
    };
    this.changeUsername = this.changeUsername.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = e => {
      console.log("Connected to server");
    };

    // Listens for new messages
    const EVENT_MESSAGE_KEY = "message";
    this.socket.addEventListener(EVENT_MESSAGE_KEY, event => {
      let message = JSON.parse(event.data);

      this.setState(previousState => ({
        messages: [...previousState.messages, message]
      }));
    });
  }
  changeUsername(username) {
    const { currentUser } = this.state;
    const newUsername = { name: username };

    this.socket.send(JSON.stringify(newMessage));

    this.setState({ currentUser: newUsername });
  }

  addMessage(message) {
    const { messages, currentUser } = this.state;

    const newMessage = {
      type: 'postMessage'
      username: currentUser.name,
      content: message
    };

    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div>
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
