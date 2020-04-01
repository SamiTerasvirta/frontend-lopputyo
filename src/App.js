import React from 'react'
import './App.css'
import { Switch, Route, Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import { useAppStyles } from './styles/AppStyle'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Home from './components/Home'
import NotFound from './components/NotFound'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer'
import Link from '@material-ui/core/Link'
import AppBarTitle from './components/AppBarTitle'
import Customers from './components/Customers'
import Trainings from './components/Trainings'
import TrainingCalendar from './components/TrainingCalendar'
import CustomerTrainings from './components/CustomerTrainings'

const App = (props) => {
  const classes = useAppStyles()
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Route component={AppBarTitle}/>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
        <ListItem button>
            <Link component={RouterLink} to="/">
              <ListItemText primary="Home" />
            </Link>
            </ListItem>
            <ListItem button>
            <Link component={RouterLink} to="/customers">
              <ListItemText primary="Customers" />
            </Link>
            </ListItem>
            <ListItem button>
            <Link component={RouterLink} to="/trainings">
              <ListItemText primary="Trainings" />
            </Link>
            </ListItem>
            <ListItem button>
            <Link component={RouterLink} to="/calendar">
              <ListItemText primary="Calendar" />
            </Link>
            </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/customers' component={Customers}/>
            <Route exact path='/trainings' component={Trainings}/>
            <Route path='/customers/:custid' component={CustomerTrainings}/>
            <Route path='/calendar' component={TrainingCalendar}/>
            <Route component={NotFound} />
          </Switch>
      </main>
    </div>
  )
}

export default App
