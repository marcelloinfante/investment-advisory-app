import axios, {AxiosResponse} from 'axios'

const API_URL = `${process.env.REACT_APP_API_URL}/api/v1`
const ASSETS_URL = `${API_URL}/assets`

const getAssets = (client_id: number) =>
  axios.get(ASSETS_URL, {params: {client_id}}).then((d: AxiosResponse) => d.data)

const getAsset = (asset_id: string, client_id: string) =>
  axios.get(`${ASSETS_URL}/${asset_id}`, {params: {client_id}}).then((d: AxiosResponse) => d.data)

const addAsset = (params: any) => axios.post(ASSETS_URL, params).then((d: AxiosResponse) => d.data)

export {getAssets, getAsset, addAsset}
