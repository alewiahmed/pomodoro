import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    breakLength: 5,
    timerState: null,
    currentTime: 1500, // 25 minutes in seconds
    sessionLength: 25
  };

  timerHandler = () => {
    let { timerState } = this.state;
    switch (timerState) {
      case 'running':
        this.setState({
          timerState: 'paused'
        });
        this.stopTimer();
        break;
      case null:
      case 'paused':
      default:
        this.setState({
          timerState: 'running'
        });
        this.startTimer();
        break;
    }
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  startTimer = () => {
    this.decrementTimer();
    this.timer = setInterval(() => {
      this.decrementTimer();
    }, 1000);
  };

  decrementTimer = () => {
    this.setState(state => {
      state.currentTime--;
      return state;
    });
  };

  showTimerInSoconds = () => {
    let { currentTime } = this.state;
    let time = parseInt(currentTime / 60, 10);
    let seconds = currentTime % 60;
    return seconds == 0 ? time : `${time}:${seconds}`;
  };

  render() {
    let { breakLength, sessionLength, currentTime } = this.state;
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div>
              <p className="adjusting-text">BREAK LENGHT</p>
              <p>- {breakLength} +</p>
            </div>
            <div>
              <p className="adjusting-text">SESSION LENGHT</p>
              <p>- {sessionLength} +</p>
            </div>
          </div>
          <div className="timer" onClick={this.timerHandler}>
            <p className="timer-text">Session</p>
            <p className="timer-text">{this.showTimerInSoconds()}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
