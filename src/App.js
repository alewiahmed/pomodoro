import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div>
              <p className="adjusting-text">BREAK LENGHT</p>
              <p>- 5 +</p>
            </div>
            <div>
              <p className="adjusting-text">SESSION LENGHT</p>
              <p>- 25 +</p>
            </div>
          </div>
          <div className="timer">
            <p className="timer-text">Session</p>
            <p className="timer-text">time</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
