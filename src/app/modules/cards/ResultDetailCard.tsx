/* eslint-disable jsx-a11y/anchor-is-valid */
import {KTSVG} from '../../../_metronic/helpers'

import {useInvestiment} from '../../context/Investiment'

import {dateFormatter, currencyFormatter, percentualFormatter} from '../../utils/formatters'

export function ResultDetailCard() {
  const {currentAsset, currentSimulation} = useInvestiment()

  const {
    agio,
    is_worth,
    market_rate,
    average_cdi,
    curve_volume,
    days_in_years,
    new_asset_code,
    new_asset_issuer,
    quotation_date,
    agio_percentage,
    final_variation,
    remaining_years,
    market_redemption,
    current_final_value,
    new_asset_duration,
    percentage_to_recover,
    variation_same_period,
    new_asset_minimum_rate,
    new_asset_maximum_rate,
    new_asset_suggested_rate,
    new_asset_indicative_rate,
    new_asset_expiration_date,
    relative_final_variation,
    new_asset_remaining_years,
    relative_variation_same_period,
    new_rate_final_value_same_period,
    new_rate_final_value_new_period,
  } = currentSimulation

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Profile Details</h3>
          </div>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Código do novo ativo</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{new_asset_code}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Emissor do novo ativo</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{new_asset_issuer}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Data da cotação</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bold fs-6'>{dateFormatter(quotation_date)}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Vencimento do novo ativo
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Phone number must be active'
              ></i>
            </label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>
                {dateFormatter(new_asset_expiration_date)}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Taxa mínima</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 me-2'>
                {percentualFormatter(new_asset_minimum_rate)}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Taxa máxima
              <i
                className='fas fa-exclamation-circle ms-1 fs-7'
                data-bs-toggle='tooltip'
                title='Country of origination'
              ></i>
            </label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {percentualFormatter(new_asset_maximum_rate)}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Duration</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{new_asset_duration}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Taxa indicativa</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {percentualFormatter(new_asset_indicative_rate)}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Nova taxa sugerida</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {percentualFormatter(new_asset_suggested_rate)}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>CDI médio</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{percentualFormatter(average_cdi)}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Volume curva</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{currencyFormatter(curve_volume)}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Resgate à mercado</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {currencyFormatter(market_redemption)}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Taxa mercado</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{percentualFormatter(market_rate)}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Ágio / Deságio</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{currencyFormatter(agio)}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>% Ágio / Deságio</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {percentualFormatter(agio_percentage)}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>% para recuperar</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {percentualFormatter(percentage_to_recover)}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Dias ano</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{days_in_years}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Anos faltantes</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{remaining_years}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Anos faltantes (nova taxa)</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{new_asset_remaining_years}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Valor final atual</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {currencyFormatter(current_final_value)}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Valor final nova taxa (mesmo vencimento da anterior)
            </label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {currencyFormatter(new_rate_final_value_same_period)}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Diferença mesmo período</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {currencyFormatter(variation_same_period)}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>
              Valor final nova taxa (vencimento ativo)
            </label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {currencyFormatter(new_rate_final_value_new_period)}
              </span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Diferença final</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{currencyFormatter(final_variation)}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Diferença relativa final</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {percentualFormatter(relative_final_variation)}
              </span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Diferença relativa mesmo período</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {percentualFormatter(relative_variation_same_period)}
              </span>
            </div>
          </div>

          <div
            className={`notice d-flex bg-light-${is_worth ? 'success' : 'danger'} rounded border-${
              is_worth ? 'success' : 'danger'
            } border border-dashed p-6`}
          >
            <KTSVG
              path='icons/duotune/general/gen044.svg'
              className='svg-icon-2tx svg-icon-warning me-4'
            />
            <div className='d-flex flex-stack flex-grow-1'>
              <div className='fw-bold'>
                <h4 className='text-gray-800 fw-bolder'>
                  {is_worth ? 'Vale a pena trocar!' : 'Não vale a pena trocar'}
                </h4>
                <div className='fs-6 text-gray-600'>
                  {is_worth
                    ? `Vale a pena trocar o ativo ${
                        currentAsset?.code
                      } pelo ativo ${new_asset_code}, já que ela vai aumentar o ganho do
                  cliente em ${percentualFormatter(
                    relative_variation_same_period
                  )} e em ${currencyFormatter(variation_same_period)}`
                    : `Não vale a pena trocar o ativo ${
                        currentAsset?.code
                      } pelo ativo ${new_asset_code}, já que ela vai diminuir o ganho do
                  cliente em ${percentualFormatter(
                    relative_variation_same_period
                  )} e em ${currencyFormatter(variation_same_period)}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
