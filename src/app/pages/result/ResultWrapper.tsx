/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useIntl} from 'react-intl'

import {PageTitle} from '../../../_metronic/layout/core'

import {useInvestiment} from '../../context/Investiment'

import {ResultCard} from '../../../_metronic/partials/content/cards/ResultCard'
import {ResultDetailCard} from '../../modules/cards/ResultDetailCard'

const DashboardPage: FC = () => {
  const {currentSimulation} = useInvestiment()

  const navigate = useNavigate()

  useEffect(() => {
    if (!currentSimulation) {
      navigate('/clientes')
    }
  }, [])

  if (!currentSimulation) {
    return <></>
  }

  return (
    <>
      <ResultCard
        isWorth={currentSimulation?.is_worth}
        code={currentSimulation?.new_asset_code}
        issuer={currentSimulation?.new_asset_issuer}
        quotationDate={currentSimulation?.quotation_date}
        finalVariation={currentSimulation?.final_variation}
        variationSamePeriod={currentSimulation?.variation_same_period}
        relativeFinalVariation={currentSimulation?.relative_final_variation}
        relativeVariationSamePeriod={currentSimulation?.relative_variation_same_period}
      />

      <ResultDetailCard />
    </>
  )
}

const ResultWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.SIMULATION'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {ResultWrapper}
