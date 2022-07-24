import React, { useState } from "react"
import Layout from "./layout"
import { getCookie, isAuth } from "../../helpers/helpers"
import { useEffect } from "react"
import userService from "../../services/user"

const Private = ({ history }) => {
  const [payload, setPayload] = useState({
    _id: isAuth()._id,
  })
  const token = getCookie("token")

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = () => {
    new userService().userById(payload._id, setPayload, token, history)
  }

  const { name, email, role } = payload

  return (
    <Layout>
      <div className="container mt-5">
        <h1>Welcome Back {name}</h1>
        <h3>email: {email}</h3>
        <h3>Role: {role}</h3>
      </div>
    </Layout>
  )
}

export default Private
