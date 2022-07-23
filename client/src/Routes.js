import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import App from "./App"
import Signup from "./components/auth/signup"
import Signin from "./components/auth/signin"
import Activate from "./components/auth/activateAccount"
import Private from "./components/core/private"
import Admin from "./components/core/admin"
import AdminRoute from "./routes/adminRoutes"
import PrivateRoute from "./routes/privateRoutes"

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/auth/activate/:token" exact component={Activate} />
        <PrivateRoute path="/private" exact component={Private} />
        <AdminRoute path="/admin" exact component={Admin} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
