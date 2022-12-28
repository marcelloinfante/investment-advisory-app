import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'

import {InvestimentProvider} from '../app/context/Investiment'

import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <InvestimentProvider>
            <AuthInit>
              <Outlet />
              <MasterInit />
            </AuthInit>
          </InvestimentProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
