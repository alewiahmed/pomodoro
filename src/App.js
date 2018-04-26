import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    breakLength: 5,
    timerStatus: null,
    currentTime: 1500, // 25 minutes in seconds
    sessionLength: 25
  };

  timerHandler = () => {
    let { timerStatus } = this.state;
    switch (timerStatus) {
      case 'running':
        this.setState({
          timerStatus: 'paused'
        });
        this.stopTimer();
        break;
      case null:
      case 'paused':
      default:
        this.setState({
          timerStatus: 'running'
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

  incrementSession = () => {
    let { timerStatus } = this.state;
    if (timerStatus === 'running') return;
    this.setState(state => {
      state.sessionLength++;
      state.currentTime = state.sessionLength * 60;
      return state;
    });
  };

  decrementSession = () => {
    let { timerStatus } = this.state;
    if (timerStatus === 'running') return;
    this.setState(state => {
      state.sessionLength =
        state.sessionLength === 1 ? 1 : --state.sessionLength;
      state.currentTime = state.sessionLength * 60;
      return state;
    });
  };

  incrementBreak = () => {
    let { timerStatus } = this.state;
    if (timerStatus === 'running') return;
    this.setState(state => {
      state.breakLength++;
      return state;
    });
  };

  decrementBreak = () => {
    let { timerStatus } = this.state;
    if (timerStatus === 'running') return;
    this.setState(state => {
      state.breakLength = state.breakLength === 1 ? 1 : --state.breakLength;
      return state;
    });
  };

  render() {
    let { breakLength, sessionLength } = this.state;
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div>
              <p className="adjusting-text">BREAK LENGHT</p>
              <div className="row">
                <button onClick={this.decrementBreak}>-</button>
                <p className="adjusted-time">{breakLength}</p>
                <button onClick={this.incrementBreak}>+</button>
              </div>
            </div>
            <div>
              <p className="adjusting-text">SESSION LENGHT</p>
              <div className="row">
                <button onClick={this.decrementSession}>-</button>
                <p className="adjusted-time">{sessionLength}</p>
                <button onClick={this.incrementSession}>+</button>
              </div>
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
