import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { red, blue } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(6, 0, 3),
    color: red[700],
  },
  link: {
      cursor: 'pointer',
      color: blue[700]
  }
}))

export const NotFound = props => {
  const classes = useStyles()
  return (
      <Box>
          <Typography variant='h3' component="h1">
              Damn: Not Found 404
          </Typography>
  <p>You tried to reach {props.location.pathname}, but didn't quite make it</p>
        <Typography className={classes.root}>
         Go <Link href='/'>
            127.0.0.1
          </Link>{' '}
          young man, or go <span className={classes.link} onClick={()=>props.history.goBack()}>back</span>.
        </Typography>
      </Box>
  )
}

export default NotFound;