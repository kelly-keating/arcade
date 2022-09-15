import React from 'react'

import Paddle from './Paddle'
import Ball from './Ball'

class Pong extends React.Component {
  state = {
    countdown: null,
    ballInPlay: false,
    keys: {},
    leftPaddle: 25,
    rightPaddle: 25,
    xSpeed: 3,
    ySpeed: 0,
    ball: {
      top: 29,
      left: 39,
    },
    score: 0,
  }

  componentDidMount = () => {
    this.countdown(5)
    this.start()
  }

  componentWillUnmount = () => {
    this.end()
  }

  countdown = (num) => { 
    if (num > 0) {
      this.setState({
        countdown: num
      }, () => {
        setTimeout(() => {
          this.countdown(num - 1)
        }, 1000)
      })
    } else {
      this.setState({
        countdown: null,
        ballInPlay: true
      })
    }
  }

  start = () => {
    this.tick = setInterval(() => {
      if (this.state.ballInPlay) { this.moveBall() }
      this.applyPaddleMovement()
    }, 100)
  }

  end = () => {
    clearInterval(this.tick)
    this.setState({
      ballInPlay: false,
    })
  }

  moveBall = () => {
    let {top, left} = this.state.ball
    top += this.state.ySpeed
    left += this.state.xSpeed

    this.setState({
      ball: { top, left }
    })

    if (left >= 75){
      this.bounce('right')
    } else if (left <= 3) {
      this.bounce('left')
    }

    if (top <= 1 || top >= 59) {
      this.setState({
        ySpeed: -1 * this.state.ySpeed
      })
    } 
  }

  bounce = (side) => {
    const ballPos = this.state.ball.top + 1
    const paddleTop = this.state[side + "Paddle"]

    const {xSpeed, ySpeed} = this.state
    const dist = ballPos - paddleTop

    const newSpeeds = [
      [1,-3],
      [2,-3],
      [2,-2],
      [3,-2],
      [3,-1],
      [3,0],
      [3,1],
      [3,2],
      [2,2],
      [2,3],
      [1,3],
    ]   
    const newSpeed = newSpeeds[dist]
    console.log(newSpeed, dist)

    if (newSpeed == undefined) {
      this.setState({ score: this.state.score - 1 })
      this.setSpeed(-1 * xSpeed, ySpeed) 
    } else {
      this.setState({ score: this.state.score + 1 })
      const [newX, newY] = newSpeed
      const currentDirection = Math.sign(xSpeed)
      const newDirection = -1 * currentDirection
      this.setSpeed(newDirection * newX, newY)
    }
  }

  setSpeed = (x, y) => {
    this.setState({
      xSpeed: x,
      ySpeed: y
    })
  }

  movePaddle = (side, direction) => {

    let position = this.state[side + "Paddle"]
    if (direction == 'down' && position < 49){
      position = position + 2
    }
    if (direction == 'up' && position > 1){
      position = position - 2
    }

    let newState = {}
    newState[side + "Paddle"] = position
    this.setState(newState)
  }

  applyPaddleMovement = () => {
    const keys = this.state.keys

    if (keys.w) { this.movePaddle('left', 'up') }
    if (keys.s) { this.movePaddle('left', 'down') }
    if (keys.ArrowUp) { this.movePaddle('right', 'up') }
    if (keys.ArrowDown) { this.movePaddle('right', 'down') }
  }

  handleKey = (evt) => {
    const keys = this.state.keys
    keys[evt.key] = (evt.type == 'keydown')

    this.setState({ keys })
  }

  renderCountdown = () => {
    return <p 
      style = {{
        position: 'absolute',
        color: 'white',
        left: '37.5vw',
        fontSize: '3rem',
      }}
    >
      {this.state.countdown}
    </p>
  }

  render = () => {
    return <>
      <h2>Pong</h2>
      <div 
        style={{
          width: '80vw',
          height: '60vw',
          background: 'black',
          position: 'relative',
          fontFamily: 'Press Start 2P'
        }}
        onKeyDown={this.handleKey}
        onKeyUp={this.handleKey}
        tabIndex='0'
      >
        <Paddle side='left' top={this.state.leftPaddle} />
        <Paddle side='right' top={this.state.rightPaddle} />
        {this.state.countdown != null && this.renderCountdown()}
        <Ball position={this.state.ball} />
        {this.state.ballInPlay && <p>{this.state.score}</p>}
      </div>
    </>
  }
}

export default Pong