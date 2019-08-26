import React from 'react'
import './SecondsCounter.css'

function SecondsCounter(props) {

  const { currentCount } = props
  return (
    <div className="SecondsCounter">
      <p>{currentCount}</p>
    </div>
  )
}

export default SecondsCounter