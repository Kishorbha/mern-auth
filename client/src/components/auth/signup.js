import { useState } from "react"
import { Link } from "react-router-dom"
import Layout from "../core/layout"
import AuthService from "../../services/auth"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const defaultForm = {
  name: "",
  email: "",
  password: "",
  buttonText: "Sign Up",
}

const Signup = () => {
  const [payload, setPayload] = useState({ ...defaultForm })

  // input change handle function
  const inputChangeHandler = (name) => (e) => {
    setPayload({ ...payload, [name]: e.target.value })
  }

  // form submit function
  const submissionHandler = (e) => {
    e.preventDefault()
    setPayload({ ...payload, buttonText: "Loading..." })
    new AuthService().signup(payload, setPayload)
  }

  return (
    <Layout>
      <ToastContainer />
      <div className="container mt-5">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign Up</h3>
              <div className="d-flex justify-content-end social_icon">
                <span>
                  <i className="fab fa-facebook-square"></i>
                </span>
                <span>
                  <i className="fab fa-google-plus-square"></i>
                </span>
                <span>
                  <i className="fab fa-twitter-square"></i>
                </span>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={submissionHandler}>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    onChange={inputChangeHandler("name")}
                    className="form-control"
                    placeholder="Full Name"
                    value={payload.name}
                    type="text"
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={payload.email}
                    onChange={inputChangeHandler("email")}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    id="password"
                    onChange={inputChangeHandler("password")}
                    value={payload.password}
                    name="password"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    value={payload.buttonText}
                    className="btn float-right login_btn"
                  />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Have an account?<Link to="/signin">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Signup
