import React from 'react'

function Paddle (props) {
  const style = {
    display: 'inline-block',
    position: 'absolute',
    background: 'white',
    width: '2vw',
    height: '10vw',
    top: props.top + 'vw',
  }
  style[props.side] = '1vw'

  return <div style={style} />
}

export default Paddle