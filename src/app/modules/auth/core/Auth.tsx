import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import axios from 'axios'

import {setupAxios} from './AuthHelpers'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {AuthModel, UserModel} from './_models'
import * as authHelper from './AuthHelpers'
import {getUserByToken, refreshToken} from './_requests'
import {WithChildren} from '../../../../_metronic/helpers'

type AuthContextProps = {
  auth: string | undefined
  saveAuth: (auth: string | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth, setAuth] = useState<string | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
  const saveAuth = (auth: string | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, saveAuth, logout, setCurrentUser} = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const {data} = await getUserByToken()
          if (data) {
            setCurrentUser(data)
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (auth) {
      requestUser()
    } else {
      logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const getNewToken = async () => {
      try {
        const {
          data: {token},
        } = await refreshToken()

        if (token) {
          saveAuth(token)
        } else {
          logout()
        }
      } catch (error) {
        console.log(error)
        logout()
      }
    }

    setInterval(() => {
      getNewToken()
    }, 5 * 60 * 1000)
  }, [])

  useEffect(() => {
    setupAxios(axios)
  }, [auth])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
