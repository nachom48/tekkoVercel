import axios, {
  AxiosError,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig
} from 'axios'

const TIMEOUT = 1 * 60 * 1000

const setupAxios = () => {
  axios.defaults.timeout = TIMEOUT
  axios.defaults.baseURL =
    process.env.REACT_APP_BACKEND_URL

  const onRequest = (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }

  const onResponse = (response: AxiosResponse) => response

  const onRejected = (response: AxiosError) => {
    return Promise.reject(response)
  }

  axios.interceptors.request.use(onRequest)
  axios.interceptors.response.use(onResponse, onRejected)
}

export default setupAxios
