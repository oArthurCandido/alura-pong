import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import useSound from 'use-sound'
import bra from '../sounds/bra.mp3'
import loop from '../sounds/loop.mp3'
import loop2 from '../sounds/loop2.mp3'
import hitBall from '../sounds/hitBall.wav'
import hitGame from '../sounds/hitGame.wav'
import loose from '../sounds/loose.wav'
import gain from '../sounds/gain.flac'

const StyledBox = styled('div')`
  

  `


function Game() {

  const [score, setScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState([0, 1, 2, 3, 4])
  const [gameOver, setGameOver] = useState(true)
  const [scoreBoard, setScoreBoard] = useState([])
  const [xPos, setXPos] = useState(0)
  const [yPos, setYPos] = useState(0)
  const [xMove, setXMove] = useState(6)
  const [yMove, setYMove] = useState(6)
  const [speed, setSpeed] = useState(1)
  const [paddlePos, setPaddlePos] = useState(0)
  const [paddleOppPos, setPaddleOppPos] = useState(0)
  const [backgroundLevel, setBackgroundLevel] = useState('black')
  const [playbackRateSetted, setPlaybackRateSetted] = useState(1)
  // const [paddleMove, setPaddleMove] = useState(0)
  // const [paddleWidth, setPaddleWidth] = useState(100)
  // const [paddleHeight, setPaddleHeight] = useState(20)
  // const [ballSize, setBallSize] = useState(20)
  // const [ballColor, setBallColor] = useState('red')
  // const [paddleColor, setPaddleColor] = useState('blue')
  // const [backgroundColor, setBackgroundColor] = useState('black')
  // const [gameWidth, setGameWidth] = useState(500)
  // const [gameHeight, setGameHeight] = useState(500)



  const [brasilsil] = useSound(bra, { volume: 0.25 })
  const [rightHere] = useSound(right, { volume: 0.25 })
  const [hitBallSound] = useSound(hitGame, { volume: 0.3 })
  const [looseSound] = useSound(loose, { volume: 0.3 })
  const [gainSound] = useSound(gain, { volume: 0.3 })
  const [loopSound, { stop }] = useSound(loop2, { volume: 0.1, loop: true, playbackRate: playbackRateSetted })



  useEffect(() => {
    let timeId;
    if (!gameOver) {
      timeId = setInterval(() => {
        setXPos(xPos + xMove)
        setYPos(yPos + yMove)

      }, 24)
    }
    return () => clearInterval(timeId)
  }, [xMove, yMove, gameOver, speed, xPos, yPos])

  useEffect(() => {
    let opPaddleId;
    if (!gameOver) {
      opPaddleId = setInterval(() => {
        setPaddleOppPos(paddleOppPos + (yPos - paddleOppPos - 5) / 30)
      }, 24)
    }
    return () => clearInterval(opPaddleId)
  }, [gameOver, xPos, paddleOppPos])

  useEffect(() => {

    if (yPos > 184) {
      setYPos(184)
      setYMove(yMove * -1)
    }
    if (yPos < -184) {
      setYPos(-184)
      setYMove(yMove * -1)
    }


  }, [yMove, yPos])

  useEffect(() => {
    if (score === 0) {
      setPlaybackRateSetted(1)
      setSpeed(1)
      setXMove(6)
      setYMove(6)
      setBackgroundLevel('black')
    }
    if (score === 1) {
      setPlaybackRateSetted(1.1)
      setSpeed(1.5)
      setXMove(xMove * speed)
      setYMove(yMove * speed)
      setBackgroundLevel('green')
    }
    if (score === 3) {
      setPlaybackRateSetted(1.2)
      setSpeed(1.8)
      setXMove(xMove * speed)
      setYMove(yMove * speed)
      setBackgroundLevel('blue')
    }
    if (score === 5) {
      setPlaybackRateSetted(1.3)
      setSpeed(2)
      setXMove(xMove * speed)
      setYMove(yMove * speed)
      setBackgroundLevel('purple')
    }
    if (score === 6) {
      setPlaybackRateSetted(1.4)
      setSpeed(1.1)
      setXMove(xMove * speed)
      setYMove(yMove * speed)
      setBackgroundLevel('red')
    }

  }, [score])


  useEffect(() => {
    if (xPos > 234) {
      setScore(score + 1)
      gainSound()
      setXPos(234)
      setXMove(xMove * -1)
    }
    if (xPos < -234) {
      let popped = opponentScore.pop()
      setOpponentScore(opponentScore)
      looseSound()
      setXPos(-234)
      setXMove(xMove * -1)
      if (opponentScore.length < 1) {

        setGameOver(true)
        stop()
      }
    }

  }, [xMove, xPos, score, opponentScore])

  useEffect(() => {
    if (xPos > 209) {
      if (yPos > paddleOppPos - 50 && yPos < paddleOppPos + 50) {
        setXPos(208)
        setXMove(xMove * -1)
        hitBallSound()

      }

    }
    if (xPos < -209) {
      if (yPos > paddlePos - 50 && yPos < paddlePos + 50) {
        setXPos(-208)
        setXMove(xMove * -1)
        hitBallSound()

      }
    }

  }, [paddlePos, xPos, yPos, xMove, yMove, score, speed])

  useEffect(() => {
    if (gameOver && score > 0) {
      setScoreBoard([...scoreBoard, score])
    }
  }, [gameOver, score, scoreBoard])

  // useEffect(() => {
  //   if (opponentScore.length < 1) {

  //     setGameOver(true)
  //   }

  // }, [opponentScore])


  // useEffect(() => {
  //   if (yMove === 0) {
  //     setGameOver(true)
  //   }
  // }, [yMove])



  const handleKeyDown = (e) => {
    if (e.keyCode === 38 && paddlePos > -154) {
      setPaddlePos(paddlePos - 30)
    }
    if (e.keyCode === 40 && paddlePos < 154) {
      setPaddlePos(paddlePos + 30)
    }
  }

  const handleDrag = (e) => {
    if (e.clientY > 80 && e.clientY < 500) {
      setPaddlePos(e.clientY - 250)
    }
  }

  const handleStart = () => {
    setGameOver(false)
    loopSound()
    setScore(0)
    setOpponentScore([0, 1, 2, 3, 4])
  }



  // const handleKeyUp = (e) => {
  //   if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
  //     setSpeed(0)
  //   }
  // }

  // const handleScore = () => {
  //   setScore(score + 1)
  // }



  return (
    <>

      <StyledBox onKeyDown={e => handleKeyDown(e)}>
        <Box mt={3} sx={{ overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '500px' }}>{opponentScore.map((score, index) => { return <Box sx={{ width: '80px', height: '10px', backgroundColor: 'black', position: 'relative' }} /> })}</Box>
          <Box tabIndex="0" backgroundColor={backgroundLevel} sx={{ overflow: 'hidden', width: '500px', my: 4, height: '400px', display: 'flex', position: 'absolute', justifyContent: 'space-between', alignItems: 'center' }}>
            {gameOver ? <Box sx={{ margin: '0, auto', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
              <Typography color={'White'}>Game Over</Typography>
              <Button variant='contained' onClick={() => handleStart()}>{scoreBoard.length === 0 ? 'Start' : 'Play Again'}</Button> <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography color={'White'}>Score: {score}</Typography>

              </Box>

            </Box>
              :
              <>
                <Box draggable='true' onDrag={e => handleDrag(e)} ml={2} top={paddlePos} sx={{ width: '10px', height: '80px', backgroundColor: 'white', position: 'relative' }} />
                <Box left={xPos} top={yPos} sx={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'white', position: 'relative' }} />
                <Box top={paddleOppPos} mr={2} sx={{ width: '10px', height: '80px', backgroundColor: 'white', position: 'relative' }} />
              </>}

          </Box>
        </Box>
      </StyledBox>

      <Typography variant='h3' mt={70} sx={{ textAlign: 'center', }}>
        Score: {score}
      </Typography>

    </>

  )
}

export default Game