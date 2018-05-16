import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" },
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          id: 2,
          username: "Anonymous",
          content:
            "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };

    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = e => {
      console.log("Connected to server");

      // const data = JSON.parse(e.data);
      // switch (data.type) {
      //   case "incomingMessage":
      //     // handle incoming message
      //     break;
      //   case "incomingNotification":
      //     // handle incoming notification
      //     break;
      //   default:
      //     // throw err
      //     throw new Error("Unknown event type" + data.type);
      // }
    };
  }

  addMessage(message) {
    const { messages, currentUser } = this.state;
    const newMessage = {
      id: messages.length + 1,
      username: currentUser.name,
      content: message
    };
    console.log(newMessage)
    const newMessages = messages.concat(newMessage);
    this.setState({ messages: newMessages });
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar
          addMessage={this.addMessage}
          currentUser={this.state.currentUser}
        />
      </div>
    );
  }
}
export default App;
