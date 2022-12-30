/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Link} from 'react-router-dom'

import {useInvestiment} from '../../../../app/context/Investiment'

type Props = {
  id: number
  name: string
  email: string
  numberOfAssets: number
  totalInCustody: number
}

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
})

const Card2: FC<Props> = ({id, name, email, numberOfAssets, totalInCustody}) => {
  const {saveCurrentClient} = useInvestiment()

  const onClick = () => {
    saveCurrentClient({id, name, email, numberOfAssets, totalInCustody})
  }

  return (
    <Link
      to='/client'
      onClick={onClick}
      className='card border border-2 border-gray-300 border-hover'
    >
      <div className='card-body p-9'>
        <div className='fs-3 fw-bolder text-dark'>{name}</div>

        <p className='text-gray-400 fw-bold fs-5 mt-1 mb-7'>{email}</p>

        <div className='d-flex flex-wrap'>
          <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3'>
            <div className='fs-6 text-gray-800 fw-bolder'>{numberOfAssets}</div>
            <div className='fw-bold text-gray-400'>Ativos</div>
          </div>

          <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3'>
            <div className='fs-6 text-gray-800 fw-bolder'>{formatter.format(totalInCustody)}</div>
            <div className='fw-bold text-gray-400'>Custódia</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export {Card2}
