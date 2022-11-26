import * as React from 'react';
import Container from '@mui/material/Container';
import Game from './pong/Game';

export default function App() {
  return (
    <Container maxWidth="sm" sx={{ height: '100%', overflow: 'hidden' }}>
      <Game />
    </Container>

  );
}