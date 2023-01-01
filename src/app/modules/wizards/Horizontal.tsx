import {FC} from 'react'
import {Link, useLocation} from 'react-router-dom'

const Horizontal: FC = () => {
  const {pathname} = useLocation()

  let clientsClassName = 'pending cursor-not-allowed'
  let assetsClassName = 'pending cursor-not-allowed'
  let simulationsClassName = 'pending cursor-not-allowed'
  let resultsClassName = 'pending cursor-not-allowed'

  let clientsTitleClassName = ''
  let assetsTitleClassName = ''
  let simulationsTitleClassName = ''

  let clientsLink = '#'
  let assetsLink = '#'
  let simulationsLink = '#'
  let resultLink = '#'

  switch (pathname) {
    case '/clientes':
      clientsClassName = 'current cursor-pointer'

      clientsLink = '/clientes'
      break
    case '/ativos':
      clientsClassName = 'completed cursor-pointer'
      assetsClassName = 'current cursor-pointer'

      clientsTitleClassName = 'text-hover-primary'

      clientsLink = '/clientes'
      assetsLink = '/ativos'
      break
    case '/simulacoes':
      clientsClassName = 'completed cursor-pointer'
      assetsClassName = 'completed cursor-pointer'
      simulationsClassName = 'current cursor-pointer'

      clientsTitleClassName = 'text-hover-primary'
      assetsTitleClassName = 'text-hover-primary'

      clientsLink = '/clientes'
      assetsLink = '/ativos'
      simulationsLink = '/simulacoes'
      break
    case '/resultado':
      clientsClassName = 'completed cursor-pointer'
      assetsClassName = 'completed cursor-pointer'
      simulationsClassName = 'completed cursor-pointer'
      resultsClassName = 'current cursor-pointer'

      clientsTitleClassName = 'text-hover-primary'
      assetsTitleClassName = 'text-hover-primary'
      simulationsTitleClassName = 'text-hover-primary'

      clientsLink = '/clientes'
      assetsLink = '/ativos'
      simulationsLink = '/simulacoes'
      resultLink = '/resultado'
      break
  }

  return (
    <div className='stepper stepper-links d-flex flex-column pt-15'>
      <div className='stepper-nav'>
        <Link to={clientsLink} className={`stepper-item ${clientsClassName}`}>
          <h3 className={`stepper-title ${clientsTitleClassName}`}>Escolher Cliente</h3>
        </Link>

        <Link to={assetsLink} className={`stepper-item ${assetsClassName}`}>
          <h3 className={`stepper-title ${assetsTitleClassName}`}>Escolher Ativo</h3>
        </Link>

        <Link to={simulationsLink} className={`stepper-item ${simulationsClassName}`}>
          <h3 className={`stepper-title ${simulationsTitleClassName}`}>Criar Simulação</h3>
        </Link>

        <Link to={resultLink} className={`stepper-item ${resultsClassName}`}>
          <h3 className={'stepper-title'}>Resultado</h3>
        </Link>
      </div>
    </div>
  )
}

export {Horizontal}
