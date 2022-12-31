/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from '../../../helpers'
import {useAuth} from '../../../../app/modules/auth'

import {useInvestiment} from '../../../../app/context/Investiment'

import {currencyFormatter} from '../../../../app/utils/formatters'

const UserHeader: React.FC = () => {
  const {currentUser} = useAuth()
  const {clients} = useInvestiment()

  const numberOfClients = clients.length
  const numberOfAssets = clients.reduce(
    (accumulator: number, item: {number_of_assets: number}) => accumulator + item.number_of_assets,
    0
  )
  const valueInCustody = clients.reduce(
    (accumulator: number, item: {total_in_custody: number}) => accumulator + item.total_in_custody,
    0
  )

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    {currentUser?.first_name} {currentUser?.last_name}
                  </a>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                    <KTSVG
                      path='/media/icons/duotune/communication/com011.svg'
                      className='svg-icon-4 me-1'
                    />
                    {currentUser?.email}
                  </a>
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>{numberOfClients}</div>
                    </div>
                    <div className='fw-bold fs-6 text-gray-400'>Clientes</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>{numberOfAssets}</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Ativos</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>{currencyFormatter(valueInCustody)}</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Custódia</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {UserHeader}
