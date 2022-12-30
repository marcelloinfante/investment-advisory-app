/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../helpers'

import {useInvestiment} from '../../../../app/context/Investiment'

type Props = {
  className: string
  assets?: []
  openModal?: () => void
}

const AssetsTable: React.FC<Props> = ({className, assets, openModal}) => {
  const {saveCurrentAsset} = useInvestiment()

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

  const onClick = (asset: any) => {
    saveCurrentAsset(asset)
  }

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Ativos</span>
          {/* <span className='text-muted mt-1 fw-semibold fs-7'>Over 500 new products</span> */}
        </h3>
        <div className='card-toolbar'>
          <a onClick={openModal} className='btn btn-sm btn-light-primary'>
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
            Adicionar Novo Ativo
          </a>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 min-w-125 px rounded-start'>Código</th>
                <th className='min-w-125px'>Emissor</th>
                <th className='min-w-125px'>Indexador</th>
                <th className='min-w-125px'>Taxa Entrada</th>
                <th className='min-w-125px'>Quantidade</th>
                <th className='min-w-150px'>Volume Aplicado</th>
                <th className='min-w-150px'>Data da Aplicação</th>
                <th className='min-w-150px'>Data de Expiração</th>
                <th className='text-end rounded-end'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {assets?.map((asset) => {
                const {
                  code,
                  issuer,
                  rate_index,
                  entrance_rate,
                  quantity,
                  volume_applied,
                  application_date,
                  expiration_date,
                } = asset

                return (
                  <tr>
                    <td onClick={() => onClick(asset)}>
                      <div className='ps-4 d-flex align-items-center'>
                        <div className='d-flex justify-content-start flex-column'>
                          <Link
                            to='/simulacoes'
                            className='text-dark fw-bold text-hover-primary mb-1 fs-6'
                          >
                            {code}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td onClick={() => onClick(asset)}>
                      <Link
                        to='/simulacoes'
                        className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'
                      >
                        {issuer}
                      </Link>
                    </td>
                    <td onClick={() => onClick(asset)}>
                      <Link
                        to='/simulacoes'
                        className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'
                      >
                        {rate_index}
                      </Link>
                    </td>
                    <td onClick={() => onClick(asset)}>
                      <Link
                        to='/simulacoes'
                        className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'
                      >
                        {percentualFormatter(entrance_rate)}
                      </Link>
                    </td>
                    <td onClick={() => onClick(asset)}>
                      <Link
                        to='/simulacoes'
                        className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'
                      >
                        {quantity}
                      </Link>
                    </td>
                    <td onClick={() => onClick(asset)}>
                      <Link
                        to='/simulacoes'
                        className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'
                      >
                        {currencyFormatter(volume_applied)}
                      </Link>
                    </td>
                    <td onClick={() => onClick(asset)}>
                      <Link
                        to='/simulacoes'
                        className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'
                      >
                        {dateFormatter(application_date)}
                      </Link>
                    </td>
                    <td onClick={() => onClick(asset)}>
                      <Link
                        to='/simulacoes'
                        className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'
                      >
                        {dateFormatter(expiration_date)}
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {AssetsTable}
