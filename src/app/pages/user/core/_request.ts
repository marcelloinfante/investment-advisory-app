import axios, {AxiosResponse} from 'axios'

const API_URL = `${process.env.REACT_APP_API_URL}/api/v1`
const CLIENTS_URL = `${API_URL}/clients`

const getClients = () => axios.get(CLIENTS_URL).then((d: AxiosResponse) => d.data)

const addClient = (params: any) =>
  axios.post(CLIENTS_URL, params).then((d: AxiosResponse) => d.data)

export {getClients, addClient}
