import authClient from "./index"
import { toast } from "react-toastify"
import { authenticate, isAuth } from "../helpers/helpers"

const resource = "api"

export default class Auth {
  // Signup
  signup(payload, setPayload) {
    return new Promise(() => {
      authClient
        .post(`${resource}/signup`, payload)
        .then((res) => {
          setPayload({
            ...payload,
            name: "",
            email: "",
            password: "",
            buttonText: "Sign Up",
          })
          toast.success(res.data.message)
        })
        .catch((err) => {
          setPayload({ ...payload, buttonText: "Sign Up" })
          toast.error(err.response.data.error)
        })
    })
  }

  // login
  signin(payload, setPayload, history) {
    return new Promise(() => {
      authClient
        .post(`${resource}/signin`, payload)
        .then((response) => {
          // save the response (user, token) localstorage/cookie
          authenticate(response, () => {
            setPayload({
              ...payload,
              name: "",
              email: "",
              password: "",
              buttonText: "Sign In",
            })

            toast.success(`Hey ${response.data.user.name}, Welcome back!`)
            isAuth() && isAuth().role === "admin"
              ? history.push("/admin")
              : history.push("/private")
          })
        })
        .catch((error) => {
          setPayload({ ...payload, buttonText: "Sign In" })
          toast.error(error.response.data.error)
        })
    })
  }
  // Activate account
  activate(token, setPayload, payload, history) {
    return new Promise(() => {
      authClient
        .post(`${resource}/account-activation`, { token })
        .then((response) => {
          setPayload({ ...payload, show: false })
          toast.success(response.data.message)
          history.push("/")
        })
        .catch((error) => {
          toast.error(error.response.data.error)
        })
    })
  }
}
