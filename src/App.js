import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    breakLength: 5,
    timerStatus: null,
    currentTime: 1500, // 25 minutes in seconds
    currentBreak: 300,
    sessionLength: 25,
    currentTurn: 'session'
  };

  componentDidMount = () => {
    //this.drawProgress({ percent: 25, color: '#03a9f4' });
  };

  timerHandler = () => {
    let { timerStatus, currentTurn } = this.state;
    switch (timerStatus) {
      case 'running':
        this.setState({
          timerStatus: 'paused'
        });
        currentTurn === 'session' ? this.stopSession() : this.stopBreak();
        break;
      case null:
      case 'paused':
      default:
        this.setState({
          timerStatus: 'running'
        });
        currentTurn === 'session' ? this.handleSession() : this.handleBreak();
        break;
    }
  };

  resetSession = () => {
    this.clearCanvas();
    this.setState(state => {
      state.currentTime = state.sessionLength * 60;
      return state;
    });
  };

  resetBreak = () => {
    this.clearCanvas();
    this.setState(state => {
      state.currentBreak = state.breakLength * 60;
      return state;
    });
  };

  stopSession = () => {
    clearInterval(this.sessionInterval);
  };

  stopBreak = () => {
    clearInterval(this.breakInterval);
  };

  handleSession = () => {
    this.decrementSession();
    this.startSession();
  };

  startSession = () => {
    this.sessionInterval = setInterval(() => {
      let { currentTime } = this.state;
      this.decrementSession();
      if (currentTime == 0) {
        clearInterval(this.sessionInterval);
        this.resetSession();
        this.setState({ currentTurn: 'break' }, this.startBreak);
      }
    }, 1000);
  };

  decrementSession = () => {
    this.setState(state => {
      state.currentTime--;
      return state;
    });
    let percent =
      100 - this.state.currentTime * 100 / (this.state.sessionLength * 60);
    this.drawProgress({ percent, color: '#03a9f4' });
  };

  handleBreak = () => {
    this.decrementBreak();
    this.startBreak();
  };

  startBreak = () => {
    this.breakInterval = setInterval(() => {
      let { currentBreak } = this.state;
      if (currentBreak == 0) {
        clearInterval(this.breakInterval);
        this.resetBreak();
        this.setState({
          currentTurn: 'session'
        });
        this.startSession();
      } else this.decrementBreak();
    }, 1000);
  };

  decrementBreak = () => {
    this.setState(state => {
      state.currentBreak--;
      return state;
    });
    let percent =
      100 - this.state.currentBreak * 100 / (this.state.breakLength * 60);
    this.drawProgress({ percent, color: '#e60000' });
  };

  showTimerInSoconds = () => {
    let { currentTime, currentBreak, currentTurn, timerStatus } = this.state;
    let theTime = currentTurn === 'session' ? currentTime : currentBreak;

    let time = parseInt(theTime / 60, 10);
    let seconds = theTime % 60;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return seconds === '00' && timerStatus !== 'running'
      ? time
      : `${time}:${seconds}`;
  };

  incrementSessionLength = () => {
    let { timerStatus } = this.state;
    if (timerStatus === 'running') return;
    this.clearCanvas();
    this.setState(state => {
      state.sessionLength++;
      state.currentTime = state.sessionLength * 60;
      return state;
    });
  };

  decrementSessionLength = () => {
    let { timerStatus } = this.state;
    if (timerStatus === 'running') return;
    this.clearCanvas();
    this.setState(state => {
      state.sessionLength =
        state.sessionLength === 1 ? 1 : --state.sessionLength;
      state.currentTime = state.sessionLength * 60;
      return state;
    });
  };

  incrementBreakLength = () => {
    let { timerStatus } = this.state;
    if (timerStatus === 'running') return;
    this.clearCanvas();
    this.setState(state => {
      state.breakLength++;
      state.currentBreak = state.breakLength * 60;
      return state;
    });
  };

  decrementBreakLength = () => {
    let { timerStatus } = this.state;
    if (timerStatus === 'running') return;
    this.clearCanvas();
    this.setState(state => {
      state.breakLength = state.breakLength === 1 ? 1 : --state.breakLength;
      state.currentBreak = state.breakLength * 60;
      return state;
    });
  };

  drawProgress = ({ percent, color }) => {
    let ctx = this.canvas.getContext('2d');
    this.drawCircleSlice(
      ctx,
      150,
      150,
      150,
      Math.PI * 1.5,
      Math.PI * (percent + 75) / 50, // startAngle + (percent * (2 * Math.pi)/100 )
      color
    );
  };

  drawCircleSlice = (
    ctx,
    centerX,
    centerY,
    radius,
    startAngle,
    endAngle,
    color
  ) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
  };

  clearCanvas = () => {
    let ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, 300, 300);
  };

  render() {
    let { breakLength, sessionLength, currentTurn } = this.state;
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div>
              <p className="adjusting-text">BREAK LENGHT</p>
              <div className="row">
                <button onClick={this.decrementBreakLength}>-</button>
                <p className="adjusted-time">{breakLength}</p>
                <button onClick={this.incrementBreakLength}>+</button>
              </div>
            </div>
            <div>
              <p className="adjusting-text">SESSION LENGHT</p>
              <div className="row">
                <button onClick={this.decrementSessionLength}>-</button>
                <p className="adjusted-time">{sessionLength}</p>
                <button onClick={this.incrementSessionLength}>+</button>
              </div>
            </div>
          </div>
          <div className="timer" onClick={this.timerHandler}>
            <p className="timer-text">
              {currentTurn === 'session' ? 'Session' : 'Break!'}
            </p>
            <p className="timer-text">{this.showTimerInSoconds()}</p>
            <canvas
              id="canv"
              width="300"
              height="300"
              className="pie-canvas"
              ref={r => (this.canvas = r)}
            />
          </div>
        </div>
        <div className="github-link">
          <a href="https://github.com/alewiahmed" target="_blank" rel="noopener noreferrer">
            Alewi ahmed
          </a>
        </div>
      </div>
    );
  }
}

export default App;
