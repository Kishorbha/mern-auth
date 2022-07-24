import userClient from "./index"
import { signout } from "../helpers/helpers"

const resource = "api"

export default class User {
  // Get User By Id
  userById(id, setPayload, token, history) {
    return new Promise((reject) => {
      userClient
        .get(`${resource}/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setPayload(response.data)
        })
        .catch((error) => {
          console.log(error)
          if (error.response.status === 401) {
            signout(() => history.push("/"))
          }
        })
    })
  }
}
