import {FC, useState, createContext, useContext} from 'react'

import {WithChildren} from '../../_metronic/helpers'
import {getClients, addClient} from '../requests/clients'
import {getAssets, addAsset} from '../requests/assets'

import {getClient, setClient, removeClient} from './helpers'

const initInvestmentContextPropsState = {
  assets: [],
  clients: [],
  currentClient: {},
  queryAssets: () => {},
  queryClients: () => {},
  createClient: () => {},
  saveCurrentClient: () => {},
}

const InvestimentContext = createContext<any>(initInvestmentContextPropsState)

const useInvestiment = () => {
  return useContext(InvestimentContext)
}

const InvestimentProvider: FC<WithChildren> = ({children}) => {
  const [clients, setClients] = useState<any>([])
  const [currentClient, setCurrentClient] = useState<any>(getClient)

  const [assets, setAssets] = useState<any>([])

  const queryClients = async () => {
    const returnedClients = await getClients()
    setClients(returnedClients)
  }

  const createClient = async (params: any) => {
    const newClient = await addClient(params)
    setClients([...clients, newClient])
  }

  const saveCurrentClient = (client: any) => {
    if (client) {
      setCurrentClient(client)
      setClient(client)
    } else {
      setCurrentClient(undefined)
      removeClient()
    }
  }

  const queryAssets = async () => {
    const returnedAssets = await getAssets(currentClient.id)
    setAssets(returnedAssets)
  }

  const createAsset = async (params: any) => {
    const newAsset = await addAsset(params)
    setAssets([...assets, newAsset])
  }

  return (
    <InvestimentContext.Provider
      value={{
        clients,
        assets,
        currentClient,
        queryAssets,
        createAsset,
        queryClients,
        createClient,
        saveCurrentClient,
      }}
    >
      {children}
    </InvestimentContext.Provider>
  )
}

export {InvestimentProvider, useInvestiment}
