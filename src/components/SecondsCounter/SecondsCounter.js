import React from 'react'
import './SecondsCounter.css'

function SecondsCounter(props) {

  const { currentCount, done } = props
  return (
    <div className="SecondsCounter" style={{ color: done ? "crimson" : "tomato"}}>
      <p>{currentCount}</p>
    </div>
  )
}

export default SecondsCounter