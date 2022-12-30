/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from '../../../helpers'

import {useInvestiment} from '../../../../app/context/Investiment'

const AssetHeader: React.FC = () => {
  const {currentAsset} = useInvestiment()

  const currencyFormatter = (percentual: number) => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    })

    return formatter.format(percentual)
  }

  const percentualFormatter = (percentual: number) => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      maximumFractionDigits: 2,
    })

    return formatter.format(percentual)
  }

  const dateFormatter = (dateInt: number) => {
    const date = new Date(dateInt)
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    return formatter.format(date)
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    {currentAsset?.issuer}
                  </a>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                    {currentAsset?.code}
                  </a>
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>{currentAsset?.rate_index}</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Indexador</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>
                        {percentualFormatter(currentAsset?.entrance_rate)}
                      </div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Taxa Entrada</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>{currentAsset?.quantity}</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Quantidade</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>
                        {currencyFormatter(currentAsset?.volume_applied)}
                      </div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Volume Aplicado</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>
                        {dateFormatter(currentAsset?.application_date)}
                      </div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Data da Aplicação</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>
                        {dateFormatter(currentAsset?.expiration_date)}
                      </div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Data de Expiração</div>
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

export {AssetHeader}
