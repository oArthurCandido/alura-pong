import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const StyledBox = styled('div')`
  

  `


function Game() {

  const [score, setScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [xPos, setXPos] = useState(0)
  const [yPos, setYPos] = useState(0)
  const [xMove, setXMove] = useState(6)
  const [yMove, setYMove] = useState(6)
  const [speed, setSpeed] = useState(1)
  const [paddlePos, setPaddlePos] = useState(0)
  const [paddleOppPos, setPaddleOppPos] = useState(0)
  // const [paddleMove, setPaddleMove] = useState(0)
  // const [paddleWidth, setPaddleWidth] = useState(100)
  // const [paddleHeight, setPaddleHeight] = useState(20)
  // const [ballSize, setBallSize] = useState(20)
  // const [ballColor, setBallColor] = useState('red')
  // const [paddleColor, setPaddleColor] = useState('blue')
  // const [backgroundColor, setBackgroundColor] = useState('black')
  // const [gameWidth, setGameWidth] = useState(500)
  // const [gameHeight, setGameHeight] = useState(500)


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
    if (score === 10) {
      setSpeed(1.5)
      setXMove(xMove * speed)
    }
    if (score === 20) {
      setSpeed(2)
      setXMove(xMove * speed)
    }
    if (score === 30) {
      setSpeed(2.5)
      setXMove(xMove * speed)
    }
    if (score === 40) {
      setSpeed(3)
      setXMove(xMove * speed)
    }
    if (score === 50) {
      setSpeed(3.5)
    }
    if (score === 60) {
      setSpeed(4)
    }
    if (score === 70) {
      setSpeed(4.5)
    }
    if (score === 80) {
      setSpeed(5)
    }
    if (score === 90) {
      setSpeed(5.5)
    }
    if (score === 100) {
      setSpeed(6)
    }
  }, [score])


  useEffect(() => {
    if (xPos > 234) {
      setScore(score + 1)

      setXPos(234)
      setXMove(xMove * -1)
    }
    if (xPos < -234) {
      setOpponentScore(opponentScore + 1)
      setXPos(-234)
      setXMove(xMove * -1)
    }

  }, [xMove, xPos])

  useEffect(() => {
    if (xPos > 209) {
      if (yPos > paddleOppPos - 50 && yPos < paddleOppPos + 50) {
        setXPos(208)
        setXMove(xMove * -1)

      }

    }
    if (xPos < -209) {
      if (yPos > paddlePos - 50 && yPos < paddlePos + 50) {
        setXPos(-208)
        setXMove(xMove * -1)

      }
    }

  }, [paddlePos, xPos, yPos, xMove, yMove, score, speed])

  useEffect(() => {
    if (opponentScore === 5) {
      setGameOver(true)
    }

  }, [opponentScore])


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
          <Box tabIndex="0" sx={{ overflow: 'hidden', width: '500px', my: 4, backgroundColor: 'black', height: '400px', display: 'flex', position: 'absolute', justifyContent: 'space-between', alignItems: 'center' }}>
            {gameOver ? <Box sx={{ margin: '0, auto', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
              <Typography color={'White'}>Game Over</Typography>
              <Button variant='contained' onClick={() => window.location.reload()}>Play Again</Button> <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography color={'White'}>Score: {score}</Typography>
                <Typography color={'White'}>Opponent Score: {opponentScore}</Typography>
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
      <Typography variant='h3' mt={2} sx={{ textAlign: 'center', }}>
        Opponent Score: {opponentScore}
      </Typography>
    </>

  )
}

export default Game