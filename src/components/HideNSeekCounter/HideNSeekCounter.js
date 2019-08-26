import React, { Component } from 'react'
import './HideNSeekCounter.css'
import NumberInput from '../NumberInput'
import SecondsCounter from '../SecondsCounter'

class HideNSeekCounter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: 20,
      currentCount: 0,
      // Possible Statuses: setup, counting, done
      appStatus: "setup"
    }
    this.updateNumberInput = this.updateNumberInput.bind(this)
    this.processSetupForm = this.processSetupForm.bind(this)
    this.secondsTimer = null
  }

  componentWillUnmount() {
    clearInterval(this.secondsTimer)
  }

  updateNumberInput(evt) {
    this.setState({ inputValue: evt.target.value })
  }

  processSetupForm(evt) {
    evt.preventDefault()
    const maxCount = parseInt(evt.target['countInput'].value)
    this.setState({ appStatus: "counting"})
    this.secondsTimer = setInterval(() => {
      this.setState(st => ({
        currentCount: st.currentCount + 1
      }), function() {
        if (this.state.currentCount >= maxCount) {
          clearInterval(this.secondsTimer)
          this.setState({ appStatus: "done"})
        }
      })
    }, 1000)
  }

  render() {
    return (
      <div className="HideNSeekCounter">
        <h1 className="HideNSeekCounter-title">Hide & Seek Counter</h1>
      {this.state.appStatus === "setup" &&
        <>
          <p className="HideNSeekCounter-setup-text">The person who's not hiding: Enter the seconds to count up to and click
            the <strong>Start Counting</strong> button. Then you can close your eyes while everyone else
            hides as you'll hear a sound when it's time to say "Ready or not, here I come!" Just make sure your volume is on.</p> 
          <NumberInput countValue={this.state.inputValue} handleChange={this.updateNumberInput} handleSubmit={this.processSetupForm} />
        </>
      }
      {(this.state.appStatus === "counting" || this.state.appStatus === "done") &&
        <SecondsCounter currentCount={this.state.currentCount} />
      }
      {this.state.appStatus === "done" &&
        <p className="HideNSeekCounter-done">Ready or not, here I come!</p>
      }
      </div>
    )
  }
}

export default HideNSeekCounter