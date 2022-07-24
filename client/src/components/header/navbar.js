import { isAuth, signout } from "../../helpers/helpers"
import { Link } from "react-router-dom"
import { Fragment } from "react"

const Navbar = ({ match, history }) => {
  const isActive = (path) => {
    if (match.path === path) {
      return { color: "#fff" }
    } else {
      return { color: "yellow" }
    }
  }
  return (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link to="/" className="nav-link" style={isActive("/")}>
          Home
        </Link>
      </li>

      {!isAuth() && (
        <Fragment>
          <li className="nav-item">
            <Link to="/signin" className="nav-link" style={isActive("/signin")}>
              Signin
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link" style={isActive("/signup")}>
              Signup
            </Link>
          </li>
        </Fragment>
      )}

      {isAuth() && isAuth().role === "admin" && (
        <li className="nav-item">
          <Link className="nav-link" style={isActive("/admin")} to="/admin">
            {isAuth().name}
          </Link>
        </li>
      )}

      {isAuth() && isAuth().role === "subscriber" && (
        <li className="nav-item">
          <Link className="nav-link" style={isActive("/private")} to="/private">
            {isAuth().name}
          </Link>
        </li>
      )}

      {isAuth() && (
        <li className="nav-item">
          <span
            className="nav-link"
            style={isActive("/signout")}
            onClick={() => {
              signout(() => {
                history.push("/")
              })
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  )
}

export default Navbar
