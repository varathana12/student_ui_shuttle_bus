
import axios from 'axios'

axios.defaults.headers.common[window.headerName] = window.token;