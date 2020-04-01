import React from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';
export const Home = () => {
  return (
    <div>
      <Container maxWidth='md'>
        <Box my={4}>
        <Paper elevation={3} style={{padding: '2em'}}>
          <Typography variant='h2' component='h1' gutterBottom>
            Samin loppuprojekti
          </Typography>
          <Typography variant='h4' component='h3' gutterBottom>
            Front End Development 
          </Typography>
          <p>Course final task: Personal trainer </p>
          <p>Implemented using libraries including:</p>
          <ul>
            <li>React</li>
            <li>React router</li>
            <li>Material UI</li>
            <li>Material table</li>
            <li>Full Calendar</li>
          </ul>
          </Paper>
        </Box>
      </Container>
    </div>
  )
}

export default Home
