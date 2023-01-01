/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {AssetHeader} from '../../../_metronic/partials'

import {useInvestiment} from '../../context/Investiment'
import {SimulationCard} from '../../../_metronic/partials/content/cards/SimulationCard'

import {CreateSimulationModal} from '../../../_metronic/partials/modals/create-simulation/CreateSimulationModal'

const DashboardPage: FC = () => {
  const [showModal, setShowModal] = useState(false)

  const {assets, simulations, querySimulations, queryCurrentAsset} = useInvestiment()

  useEffect(() => {
    querySimulations()
  }, [])

  useEffect(() => {
    queryCurrentAsset()
  }, [assets])

  return (
    <>
      <AssetHeader />

      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>Simulações</h3>

        <div className='d-flex flex-wrap my-2'>
          <a
            onClick={() => setShowModal(true)}
            className='btn btn-primary btn-sm'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_client'
          >
            Adicionar Nova Simulação
          </a>
        </div>
      </div>

      <div className='row g-6 g-xl-9'>
        {simulations.map((simulation: any) => {
          const {
            is_worth,
            quotation_date,
            new_asset_code,
            final_variation,
            new_asset_issuer,
            variation_same_period,
            relative_final_variation,
            relative_variation_same_period,
          } = simulation

          return (
            <div className='col-md-12 col-xl-6'>
              <SimulationCard
                isWorth={is_worth}
                code={new_asset_code}
                issuer={new_asset_issuer}
                quotationDate={quotation_date}
                finalVariation={final_variation}
                variationSamePeriod={variation_same_period}
                relativeFinalVariation={relative_final_variation}
                relativeVariationSamePeriod={relative_variation_same_period}
              />
            </div>
          )
        })}
      </div>

      <CreateSimulationModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  )
}

const SimulationsWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.ASSET'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {SimulationsWrapper}
