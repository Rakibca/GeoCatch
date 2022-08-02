import React from 'react';
import Userfront from "@userfront/core";

// Initialize Userfront Core JS
Userfront.init("");

// Define the logout button component
class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: !Userfront.tokens.accessToken,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    Userfront.logout();
  }

  render() {
    return (
      <button
        id="logout-button"
        onClick={this.handleClick}
        disabled={this.state.disabled}
      >
        Log out
      </button>
    );
  }
}

export default LogoutButton;