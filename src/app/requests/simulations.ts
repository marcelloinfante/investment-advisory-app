import axios, {AxiosResponse} from 'axios'

const API_URL = `${process.env.REACT_APP_API_URL}/api/v1`
const SIMULATIONS_URL = `${API_URL}/simulations`

const getSimulations = (client_id: string, asset_id: string) =>
  axios.get(SIMULATIONS_URL, {params: {client_id, asset_id}}).then((d: AxiosResponse) => d.data)

const getSimulation = (simulation_id: string) =>
  axios.get(`${SIMULATIONS_URL}/${simulation_id}`).then((d: AxiosResponse) => d.data)

const addSimulation = (params: any) =>
  axios.post(SIMULATIONS_URL, params).then((d: AxiosResponse) => d.data)

export {getSimulations, getSimulation, addSimulation}
