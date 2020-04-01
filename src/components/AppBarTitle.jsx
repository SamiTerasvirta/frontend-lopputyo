import React, { Component } from 'react'
import { withRouter, Link as RouterLink } from 'react-router-dom'
import { Typography, Breadcrumbs } from '@material-ui/core'
import Link from '@material-ui/core/Link'

class AppBarTitle extends Component {
  render () {
    const { location } = this.props
    const links = location.pathname.split('/').map(part => {
        const address = location.pathname.substring(0, location.pathname.indexOf(part)+part.length);
        return <Link key={part} color='inherit' component={RouterLink} to={address}>
        {part}
      </Link>

    })
    links.pop()
    links.push(<Typography key={location.pathname.split('/').pop()}>{location.pathname.split('/').pop()}</Typography>)
    links[0] = (<Link key="approot" color='inherit' component={RouterLink} to='/'>Samin loppuprojekti</Link>)
    return (
      <Typography variant='h6' noWrap>
        <Breadcrumbs aria-label='breadcrumb' color='inherit'>
        {links}
        </Breadcrumbs>
      </Typography>
    )
  }
}

export default withRouter(AppBarTitle)
