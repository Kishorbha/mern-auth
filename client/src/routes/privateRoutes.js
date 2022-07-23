import { Redirect, Route } from "react-router-dom"
import { isAuth } from "../helpers/helpers"

const Private = ({ Component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  ></Route>
)
export default Private
