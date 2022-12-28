import {FC, useState, createContext, useContext} from 'react'

import {WithChildren} from '../../_metronic/helpers'
import {getClients, addClient} from '../pages/user/core/_request'

const initInvestmentContextPropsState = {
  clients: [],
  currentClient: {},
  queryClients: () => {},
  createClient: () => {},
  setCurrentClient: () => {},
}

const InvestimentContext = createContext<any>(initInvestmentContextPropsState)

const useInvestiment = () => {
  return useContext(InvestimentContext)
}

const InvestimentProvider: FC<WithChildren> = ({children}) => {
  const [clients, setClients] = useState<any>([])
  const [currentClient, setCurrentClient] = useState<any>([])

  const queryClients = async () => {
    const returnedClients = await getClients()
    setClients(returnedClients)
  }

  const createClient = async (params: any) => {
    const newClient = await addClient(params)
    setClients([...clients, newClient])
  }

  return (
    <InvestimentContext.Provider
      value={{clients, currentClient, queryClients, createClient, setCurrentClient}}
    >
      {children}
    </InvestimentContext.Provider>
  )
}

export {InvestimentProvider, useInvestiment}
