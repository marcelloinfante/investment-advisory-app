/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../../helpers'

import {
  dateFormatter,
  currencyFormatter,
  percentualFormatter,
} from '../../../../app/utils/formatters'

type Props = {
  code: string
  issuer: string
  isWorth: boolean
  quotationDate: number
  finalVariation: number
  variationSamePeriod: number
  relativeFinalVariation: number
  relativeVariationSamePeriod: number
}

const ResultCard: FC<Props> = ({
  code,
  issuer,
  isWorth,
  quotationDate,
  finalVariation,
  variationSamePeriod,
  relativeFinalVariation,
  relativeVariationSamePeriod,
}) => {
  return (
    <Link to='/resultado' className='card mb-5 mb-xl-10' style={{cursor: 'auto'}}>
      <div className='card-header border-0 pt-9'>
        <div className='card-toolbar'>
          <span className='badge badge-light-warning fw-bolder me-auto px-4 py-3'>
            Data da cotação: {dateFormatter(quotationDate)}
          </span>
        </div>

        <div className='card-toolbar'>
          <span
            className={`badge badge-light-${
              isWorth ? 'success' : 'danger'
            } fw-bolder me-auto px-4 py-3`}
          >
            {isWorth ? 'VALE A PENA TROCAR' : 'NÃO VALE A PENA TROCAR'}
          </span>
        </div>
      </div>

      <div className='card-body p-9'>
        <div className='fs-3 fw-bolder text-dark'>{issuer}</div>

        <p className='text-gray-400 fw-bold fs-5 mt-1 mb-7'>{code}</p>

        <div className='fs-3 fw-bolder text-dark mb-3'>Diferença (período igual)</div>

        <div className='d-flex flex-wrap'>
          <div className='text-gray-800 fs-2tx fw-bolder mb-3'>
            {currencyFormatter(finalVariation)}
          </div>
        </div>

        <div className='d-flex flex-wrap mb-5'>
          <div className='d-flex align-items-center flex-wrap mb-5 mt-auto fs-6'>
            {relativeFinalVariation > 0 && (
              <KTSVG
                path='/media/icons/duotune/arrows/arr007.svg'
                className='svg-icon-3 me-1 svg-icon-success'
              />
            )}

            {relativeFinalVariation < 0 && (
              <KTSVG
                path='/media/icons/duotune/arrows/arr006.svg'
                className='svg-icon-3 me-1 svg-icon-danger'
              />
            )}
            <div
              className={
                'fw-bolder me-2 ' + (relativeFinalVariation > 0 ? 'text-success' : 'text-danger')
              }
            >
              {percentualFormatter(relativeFinalVariation)}
            </div>
            <div className='fw-bold text-gray-400'>Diferença Relativa</div>
          </div>
        </div>

        <div className='fs-3 fw-bolder text-dark mb-3'>Diferença (período diferente)</div>

        <div className='d-flex flex-wrap'>
          <div className='text-gray-800 fs-2tx fw-bolder mb-3'>
            {currencyFormatter(variationSamePeriod)}
          </div>
        </div>

        <div className='d-flex flex-wrap mb-5'>
          <div className='d-flex align-items-center flex-wrap mt-auto fs-6'>
            {relativeVariationSamePeriod > 0 && (
              <KTSVG
                path='/media/icons/duotune/arrows/arr007.svg'
                className='svg-icon-3 me-1 svg-icon-success'
              />
            )}

            {relativeVariationSamePeriod < 0 && (
              <KTSVG
                path='/media/icons/duotune/arrows/arr006.svg'
                className='svg-icon-3 me-1 svg-icon-danger'
              />
            )}
            <div
              className={
                'fw-bolder me-2 ' +
                (relativeVariationSamePeriod > 0 ? 'text-success' : 'text-danger')
              }
            >
              {percentualFormatter(relativeVariationSamePeriod)}
            </div>
            <div className='fw-bold text-gray-400'>Diferença Relativa</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export {ResultCard}
