import {FC} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'

import {useFirebase} from '../../context/Firebase'

const Horizontal: FC = () => {
  const {registerEvent} = useFirebase()

  const {pathname} = useLocation()
  const navigate = useNavigate()

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

  const onClick = (link: string) => {
    navigate(link)

    registerEvent('header_navigate', {
      step: link,
    })
  }

  return (
    <div className='stepper stepper-links d-flex flex-column pt-15'>
      <div className='stepper-nav'>
        <a onClick={() => onClick(clientsLink)} className={`stepper-item ${clientsClassName}`}>
          <h3 className={`stepper-title ${clientsTitleClassName}`}>Escolher Cliente</h3>
        </a>

        <a onClick={() => onClick(assetsLink)} className={`stepper-item ${assetsClassName}`}>
          <h3 className={`stepper-title ${assetsTitleClassName}`}>Escolher Ativo</h3>
        </a>

        <a
          onClick={() => onClick(simulationsLink)}
          className={`stepper-item ${simulationsClassName}`}
        >
          <h3 className={`stepper-title ${simulationsTitleClassName}`}>Criar Simulação</h3>
        </a>

        <a onClick={() => onClick(resultLink)} className={`stepper-item ${resultsClassName}`}>
          <h3 className={'stepper-title'}>Resultado</h3>
        </a>
      </div>
    </div>
  )
}

export {Horizontal}
