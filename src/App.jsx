import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" },
      messages: [],
      notifications: []
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
    this.socket.onmessage = event => {
      let data = JSON.parse(event.data);

      switch (data.type) {
        case "incomingMessage":
          this.setState(previousState => ({
            messages: [...previousState.messages, data]
          }));
          break;
        case "incomingNotification":
          this.setState(previousState => ({
            notifications: [...previousState.notifications, data]
          }));
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    };
  }
  changeUsername(username) {
    const { messages, currentUser } = this.state;
    const newUsername = { name: username };

    const notification = {
      type: 'postNotification',
      content: `${currentUser.name} has changed their name to ${newUsername.name}`
    }

    this.socket.send(JSON.stringify(notification));

    this.setState({ currentUser: newUsername });
  }

  addMessage(message) {
    const { messages, currentUser } = this.state;

    const newMessage = {
      type: "postMessage",
      username: currentUser.name,
      content: message
    };

    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} notifications={this.state.notifications}/>
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
