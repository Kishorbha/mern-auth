import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Layout from "../core/layout"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import authService from "../../services/auth"

const defaultForm = {
  email: "",
  password: "",
  buttonText: "Sign In",
}
const Signin = () => {
  const [payload, setPayload] = useState({ ...defaultForm })
  const history = useHistory()

  const { email, password, buttonText } = payload

  const handleChange = (name) => (event) => {
    setPayload({ ...payload, [name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setPayload({ ...payload, buttonText: "Loading..." })
    new authService().signin(payload, setPayload, history)
  }

  const signinForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="input-group form-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fas fa-user"></i>
          </span>
        </div>
        <input
          onChange={handleChange("email")}
          value={email}
          type="email"
          className="form-control"
          placeholder="Email"
        />
      </div>
      <div className="input-group form-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fas fa-key"></i>
          </span>
        </div>
        <input
          onChange={handleChange("password")}
          value={password}
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>
      <div className="row align-items-center remember">
        <input type="checkbox" />
        Remember Me
      </div>
      <div className="form-group">
        <input
          type="submit"
          value={buttonText}
          className="btn float-right login_btn"
        />
      </div>
    </form>
  )

  return (
    <Layout>
      <ToastContainer />
      <div className="container mt-5">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
            </div>
            <div className="card-body">{signinForm()}</div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?<Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Signin
