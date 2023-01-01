import {FC, useState, createContext, useContext} from 'react'

import {WithChildren} from '../../_metronic/helpers'
import {getClients, getClient, addClient} from '../requests/clients'
import {getAssets, getAsset, addAsset} from '../requests/assets'
import {getSimulations, getSimulation, addSimulation} from '../requests/simulations'

import {
  getClientFromLocalStorage,
  setClientFromLocalStorage,
  removeClientFromLocalStorage,
} from '../local-storage/client'

import {
  getAssetFromLocalStorage,
  setAssetFromLocalStorage,
  removeAssetFromLocalStorage,
} from '../local-storage/asset'

import {
  getSimulationFromLocalStorage,
  setSimulationFromLocalStorage,
  removeSimulationFromLocalStorage,
} from '../local-storage/simulation'

const initInvestmentContextPropsState = {
  clients: [],
  assets: [],
  simulations: [],
  currentClient: {},
  currentAsset: {},
  currentSimulation: {},
  queryAssets: () => {},
  createAsset: () => {},
  queryClients: () => {},
  createClient: () => {},
  querySimulations: () => {},
  createSimulation: () => {},
  saveCurrentClient: () => {},
  saveCurrentAsset: () => {},
  queryCurrentAsset: () => {},
  queryCurrentClient: () => {},
  saveCurrentSimulation: () => {},
}

const InvestimentContext = createContext<any>(initInvestmentContextPropsState)

const useInvestiment = () => {
  return useContext(InvestimentContext)
}

const InvestimentProvider: FC<WithChildren> = ({children}) => {
  const [assets, setAssets] = useState<any>([])
  const [clients, setClients] = useState<any>([])
  const [simulations, setSimulations] = useState<any>([])

  const [currentClient, setCurrentClient] = useState<any>(getClientFromLocalStorage)
  const [currentAsset, setCurrentAsset] = useState<any>(getAssetFromLocalStorage)
  const [currentSimulation, setCurrentSimulation] = useState<any>(getSimulationFromLocalStorage)

  const queryClients = async () => {
    const returnedClients = await getClients()
    setClients(returnedClients)
  }

  const queryCurrentClient = async () => {
    const returnedClient = await getClient(currentClient.id)
    saveCurrentClient(returnedClient)
  }

  const createClient = async (params: any) => {
    const newClient = await addClient(params)
    setClients([...clients, newClient])
    saveCurrentClient(newClient)
  }

  const saveCurrentClient = (client: any) => {
    if (client) {
      setCurrentClient(client)
      setClientFromLocalStorage(client)
    } else {
      setCurrentClient(undefined)
      removeClientFromLocalStorage()
    }
  }

  const queryAssets = async () => {
    const returnedAssets = await getAssets(currentClient.id)
    setAssets(returnedAssets)
  }

  const queryCurrentAsset = async () => {
    const returnedAsset = await getAsset(currentAsset.id, currentClient.id)
    saveCurrentAsset(returnedAsset)
  }

  const createAsset = async (params: any) => {
    const newAsset = await addAsset(params)
    setAssets([...assets, newAsset])
    saveCurrentAsset(newAsset)
  }

  const saveCurrentAsset = (asset: any) => {
    if (asset) {
      setCurrentAsset(asset)
      setAssetFromLocalStorage(asset)
    } else {
      setCurrentAsset(undefined)
      removeAssetFromLocalStorage()
    }
  }

  const querySimulations = async () => {
    const returnedSimulations = await getSimulations(currentClient.id, currentAsset.id)
    setSimulations(returnedSimulations)
  }

  const createSimulation = async (params: any) => {
    const newSimulation = await addSimulation(params)
    setSimulations([...clients, newSimulation])
    saveCurrentSimulation(newSimulation)
  }

  const saveCurrentSimulation = (simulation: any) => {
    if (simulation) {
      setCurrentSimulation(simulation)
      setSimulationFromLocalStorage(simulation)
    } else {
      setCurrentSimulation(undefined)
      removeSimulationFromLocalStorage()
    }
  }

  return (
    <InvestimentContext.Provider
      value={{
        clients,
        assets,
        simulations,
        currentClient,
        currentAsset,
        currentSimulation,
        queryAssets,
        createAsset,
        queryClients,
        createClient,
        querySimulations,
        createSimulation,
        queryCurrentAsset,
        queryCurrentClient,
        saveCurrentAsset,
        saveCurrentClient,
        saveCurrentSimulation,
      }}
    >
      {children}
    </InvestimentContext.Provider>
  )
}

export {InvestimentProvider, useInvestiment}
