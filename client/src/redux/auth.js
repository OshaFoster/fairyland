import axios from "axios";
const userUrl = "/admin/"
const ordersUrl = "/admin/orders";

const LOGON = "LOGON"
const HANDLE_AUTH_ERR = "HANDLE_AUTH_ERR"
const LOGOUT = "LOGOUT"

const auth = {
  user: {
    username: "",
    admin: false,
    _id: ""
  },
  authErrCode: {
    signin: ""
  },
  isAuthenticated: false
}

axios.interceptors.request.use((config)=>{
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`
  return config
})

function logon(success, user) {
  return {
    type: LOGON,
    success,
    user
  }
}

function handleAuthErr(key, errCode) {
  return {
    type: HANDLE_AUTH_ERR,
    key,
    errCode
  }
}

export function logout() {
  localStorage.removeItem("token");
  return {
    type: LOGOUT
  }
}
export function signin(credentials, history) {
  return (dispatch) => {
    axios.post(userUrl + "login", credentials)
      .then((response) => {
        let {
          token,
          user,
          success
        } = response.data;
        localStorage.setItem("token", token);
        dispatch(logon(success, user));
        history.push("/admin/orders");
      })
      .catch((err) => {
        console.error(err);
        dispatch(handleAuthErr("signin", err.response.status))
      });
  }
}

export function verify(){
  return (dispatch)=>{
    axios.get(ordersUrl + "/verify")
      .then((response)=>{
        let {success, user} = response.data;
        dispatch(logon(success, user));
      })
      .catch((err)=>{
        console.error(err);
      })
  }
}

export default function authReducer(prevAuth = auth, action) {
  switch (action.type) {
    case LOGOUT:
      return auth
    case LOGON:
      return {
        ...prevAuth,
        authErrCode: {
          signin: ""
        },
        user: action.user,
        isAuthenticated: action.success
      }
    case HANDLE_AUTH_ERR:
      return {
        ...prevAuth,
        authErrCode: {
          ...prevAuth.authErrCode,
          [action.key]: action.errCode
        }
      }
    default:
      return prevAuth
  }
}