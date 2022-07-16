import React, { Fragment } from "react"
import { withRouter } from "react-router-dom"
import Navbar from "../header/navbar"
const Layout = ({ children, match, history }) => {
  return (
    <Fragment>
      <Navbar match={match} history={history} />
      <div className="container">{children}</div>
    </Fragment>
  )
}

export default withRouter(Layout)
