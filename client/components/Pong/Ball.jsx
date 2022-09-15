import React from 'react'

function Ball (props) {
  const {top, left} = props.position
  return <div style={{
    display: 'inline-block',
    position: 'absolute',
    borderRadius: "50%",
    background: 'white',
    width: '2vw',
    height: '2vw',
    left: left + 'vw',
    top: top + 'vw',
  }} />
}

export default Ball