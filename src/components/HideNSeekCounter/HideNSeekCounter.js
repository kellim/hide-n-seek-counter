import React, { Component } from 'react'
import './HideNSeekCounter.css'
import NumberInput from '../NumberInput'
import SecondsCounter from '../SecondsCounter'
import timesUpAudio from '../../audio/timesup.mp3'

class HideNSeekCounter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: 20,
      currentCount: 0,
      // Possible Statuses: setup, counting, done
      appStatus: "setup"
    }
    this.audioEl = React.createRef()
    this.updateNumberInput = this.updateNumberInput.bind(this)
    this.processSetupForm = this.processSetupForm.bind(this)
    this.handleRestartBtnClick = this.handleRestartBtnClick.bind(this)
    this.handleReturnBtnClick = this.handleReturnBtnClick.bind(this)
    this.secondsTimer = null
  }

  componentWillUnmount() {
    clearInterval(this.secondsTimer)
    this.resetAudio()
  }

  updateNumberInput(evt) {
    this.setState({ inputValue: evt.target.value })
  }

  handleRestartBtnClick() {
    if (this.state.appStatus === "done") {
      this.resetAudio()
    }
    clearInterval(this.secondsTimer)
    this.setState({ 
      currentCount: 0,
      appStatus: "counting"
    })
    this.startCounting()
  }

  handleReturnBtnClick() {
    if (this.state.appStatus === "done") {
      this.resetAudio()
    }
    clearInterval(this.secondsTimer)
    this.setState({ 
      appStatus: "setup",
      currentCount: 0
    })
  }

  processSetupForm(evt) {
    evt.preventDefault()
    this.setState({ appStatus: "counting"})
    this.startCounting()
  }

  startCounting() {
    this.secondsTimer = setInterval(() => {
      this.setState(st => ({
        currentCount: st.currentCount + 1
      }), function() {
        if (this.state.currentCount >= this.state.inputValue) {
          this.audioEl.current.play()
          clearInterval(this.secondsTimer)
          this.setState({ appStatus: "done" })
        }
      })
    }, 1000)
  }

  resetAudio() {
    this.audioEl.current.pause()
    this.audioEl.current.currentTime = 0
  }

  render() {
    const { inputValue, currentCount, appStatus } = this.state
    return (
      <div className="HideNSeekCounter">
        <audio ref={this.audioEl} src={timesUpAudio} />
        <h1 className="HideNSeekCounter-title">Hide & Seek Counter</h1>
      {appStatus === "setup" ?
        <>
          <p className="HideNSeekCounter-setup-text">To the person who's not hiding: Enter the seconds to count up to and click
            the <strong>Start Counting</strong> button. When the time is up, you'll hear "Time's up! Ready or not here I come" so make sure your volume is on.</p> 
          <NumberInput countValue={inputValue} handleChange={this.updateNumberInput} handleSubmit={this.processSetupForm} />
        </>
      :
        <>
          <SecondsCounter currentCount={currentCount} done={appStatus==="done"} />
          {appStatus === "done" &&
            <div className="HideNSeekCounter-done">
              <p>Time's Up!</p> 
              <p>Ready or not, here I come!</p>
            </div>
          }
          <div className="HideNSeekCounter-btn-container">
            <button className="HideNSeekCounter-btn" type="button" onClick={this.handleRestartBtnClick}>Restart Count</button>
            <button className="HideNSeekCounter-btn" type="button" onClick={this.handleReturnBtnClick}>Return to Setup</button>
          </div>
        </>
      }
      </div>
    )
  }
}

export default HideNSeekCounter