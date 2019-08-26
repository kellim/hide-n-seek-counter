import React from 'react'
import './NumberInput.css'

function NumberInput(props) {

  const { handleChange, handleSubmit, countValue } = props
  return (
    <form className="NumberInput" onSubmit={handleSubmit}>
      <div className="NumberInput-container">
        <label htmlFor="countInput">Seconds to Count (10-100):</label>
        <input
          type="number"
          id="countInput"
          name="countInput"
          min="10"
          max="100"
          value={countValue}
          onChange={handleChange}
        />
      </div>
      <button className="NumberInput-btn" type="submit">Start Counting!</button>
    </form>
  )
}

export default NumberInput