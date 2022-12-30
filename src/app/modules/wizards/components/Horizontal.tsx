import {FC} from 'react'
import {Link, useLocation} from 'react-router-dom'

const Horizontal: FC = () => {
  const {pathname} = useLocation()

  console.log(pathname)

  let clientsClassName = 'pending cursor-not-allowed'
  let assetsClassName = 'pending cursor-not-allowed'
  let simulationsClassName = 'pending cursor-not-allowed'
  let resultsClassName = 'pending cursor-not-allowed'

  let clientsLink = '#'
  let assetsLink = '#'
  let simulationsLink = '#'
  let resultLink = '#'

  switch (pathname) {
    case '/clients':
      clientsClassName = 'current cursor-pointer'

      clientsLink = '/clients'
      break
    case '/assets':
      clientsClassName = 'completed cursor-pointer'
      assetsClassName = 'current cursor-pointer'

      clientsLink = '/clients'
      assetsLink = '/assets'
      break
    case '/simulations':
      clientsClassName = 'completed cursor-pointer'
      assetsClassName = 'completed cursor-pointer'
      simulationsClassName = 'current cursor-pointer'

      clientsLink = '/clients'
      assetsLink = '/assets'
      simulationsLink = '/simulations'
      break
    case '/result':
      clientsClassName = 'completed cursor-pointer'
      assetsClassName = 'completed cursor-pointer'
      simulationsClassName = 'completed cursor-pointer'
      resultsClassName = 'current cursor-pointer'

      clientsLink = '/clients'
      assetsLink = '/assets'
      simulationsLink = '/simulations'
      resultLink = '/result'
      break
  }

  return (
    <div className='stepper stepper-links d-flex flex-column pt-15'>
      <div className='stepper-nav'>
        <Link to={clientsLink} className={`stepper-item ${clientsClassName}`}>
          <h3 className='stepper-title'>Escolher Cliente</h3>
        </Link>

        <Link to={assetsLink} className={`stepper-item ${assetsClassName}`}>
          <h3 className='stepper-title'>Escolher Ativo</h3>
        </Link>

        <Link to={simulationsLink} className={`stepper-item ${simulationsClassName}`}>
          <h3 className='stepper-title'>Criar Simulação</h3>
        </Link>

        <Link to={resultLink} className={`stepper-item ${resultsClassName}`}>
          <h3 className='stepper-title'>Resultado</h3>
        </Link>
      </div>
    </div>
  )
}

export {Horizontal}
