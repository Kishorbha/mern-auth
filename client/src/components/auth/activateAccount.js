import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import authService from "../../services/auth"
import Layout from "../../components/core/layout"
import { ToastContainer } from "react-toastify"
import { useHistory } from "react-router-dom"

const Activate = ({ match }) => {
  const [payload, setPayload] = useState({
    name: "",
    token: "",
    show: true,
  })
  const history = useHistory()

  useEffect(() => {
    let token = match.params.token
    let { name } = jwt_decode(token)
    if (token) {
      setPayload({ ...payload, name, token })
    }
  }, [])

  const { name, token } = payload

  const handleActive = (e) => {
    e.preventDefault()
    new authService().activate(token, setPayload, payload, history)
  }

  const activationLink = () => (
    <div className="text-center">
      <ToastContainer />
      <h1 className="p-5 text-light">
        Hey {name}, Ready to activate your account?
      </h1>
      <button className="btn btn-outline-dark" onClick={handleActive}>
        Activate Account
      </button>
    </div>
  )

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">{activationLink()}</div>
    </Layout>
  )
}
export default Activate
