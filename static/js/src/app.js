/** @jsx React.DOM */

// ARCHITECTURE
// App Container
//   ChatContainer -> main chat content (updated when user enters new room)
//     MesagesPane -> returns list of messages
//     InputPane -> interface to allow user to send new messages
//   RoomPane -> side pane shows rooms users can enter
var AppContainer = React.createClass({
  getInitialState: function() {
    return {
      rooms: [
        {'id': 1, 'name': 'Larry David', 'messages': ['Ill get you Mochoa Joe!', 'One thing I admire about Hitler - he never took any shit from magicians.']},
        {'id': 2, 'name': 'Jerry Seinfeld', 'messages': ['But I dont wanna be a pirate.']},
        {'id': 3, 'name': 'George', 'messages': ['George is getting hungry.']},
      ],
      selectedRoom: {'messages': [], name: 'All Rooms'}
    };
  },
  render: function() {
    return (
      <div className="appContainer">
        <h2>Chat Room: {this.state.selectedRoom.name}</h2>
        <RoomPane
          rooms={this.state.rooms}
          onRoomSelected={this.setSelectedRoom} />
        <ChatContainer
          rooms={this.state.rooms}
          selectedRoom={this.state.selectedRoom}
          onMessageSent={this.updateMessageList} />
      </div>
    );
  },
  // Callback to allow the state of the currently selected room to change
  setSelectedRoom: function(room) {
    this.setState({
      selectedRoom: room
    });
  },
  // Callback to update the message list for the currently selected room
  updateMessageList: function(messageBody){
    this.state.selectedRoom.messages.push(messageBody);
    this.setState({
      selectedRoom: this.state.selectedRoom
    });
  }
});


var RoomPane = React.createClass({
  render: function() {
    var _this = this;
    var rooms = this.props.rooms.map(function(item) {
      return (
        <Room
          key={item.id}
          item={item}
          onRoomSelected={_this.props.onRoomSelected} />
      );
    });

    return (
      <div className="roomPane">
        <ul>
          {rooms}
        </ul>
      </div>
    );
  }
});
var Room = React.createClass({
  onClick: function() {
    this.props.onRoomSelected(this.props.item);  // Fire callback to set the room state
  },
  render: function() {
    return (
      <li onClick={this.onClick}>
        {this.props.item.name}
      </li>
    );
  }
});


var ChatContainer = React.createClass({
  render: function() {
    return (
      <div className="chatPane">
        <MessagesPane selectedRoom={this.props.selectedRoom} />
        <InputPane onMessageSent={this.props.onMessageSent} />
      </div>
    );
  }
});


var MessagesPane = React.createClass({
  render: function() {
    var createMessage = function(message) {
      return <li>{message}</li>;
    };
    return <ul>{this.props.selectedRoom.messages.map(createMessage)}</ul>;
  }
});

var InputPane = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },
  onChange: function(e){
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onMessageSent(this.state.text);
    this.setState({text: ''});
  },
  render: function() {
    return (
      <div className="inputPane">
        <form onSubmit={this.handleSubmit}>
          <textarea onChange={this.onChange} value={this.state.text} />
          <button>Send</button>
        </form>
      </div>
    );
  }
});


React.renderComponent(
  <AppContainer />,
  document.getElementById('app')
);
