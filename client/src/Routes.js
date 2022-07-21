import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import App from "./App"
import Signup from "./components/auth/signup"
import Signin from "./components/auth/signin"
import Activate from "./components/auth/activateAccount"

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/auth/activate/:token" exact component={Activate} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
