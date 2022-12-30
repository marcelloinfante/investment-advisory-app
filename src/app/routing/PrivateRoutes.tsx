import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {ClientsWrapper} from '../pages/clients/ClientsWrapper'
import {AssetsWrapper} from '../pages/assets/AssetsWrapper'
import {SimulationsWrapper} from '../pages/simulations/SimulationsWrapper'

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/clientes' />} />
        {/* Pages */}
        <Route path='clientes' element={<ClientsWrapper />} />
        <Route path='ativos' element={<AssetsWrapper />} />
        <Route path='simulacoes' element={<SimulationsWrapper />} />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export {PrivateRoutes}
