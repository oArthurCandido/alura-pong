import { Box, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'

function Game() {

  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)




  return (
    <Box sx={{ width: '500px', my: 4, backgroundColor: 'black', height: '400px', display: 'flex', position: 'absolute', justifyContent: 'space-between' }}>
      <Box ml={2} sx={{ width: '10px', height: '80px', backgroundColor: 'white', top: '160px', position: 'relative' }} />
      <Box sx={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'white', top: '180px', position: 'relative' }} />

      <Box mr={2} sx={{ width: '10px', height: '80px', backgroundColor: 'white', top: '160px', position: 'relative' }} />
    </Box>
  )
}

export default Game