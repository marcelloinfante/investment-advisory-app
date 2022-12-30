/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {AssetHeader} from '../../../_metronic/partials'

import {useInvestiment} from '../../context/Investiment'
import {CreateAssetModal} from '../../../_metronic/partials/modals/create-asset/CreateAssetModal'

import {AssetsTable} from '../../../_metronic/partials/widgets'

const DashboardPage: FC = () => {
  const [showModal, setShowModal] = useState(false)

  const {assets, querySimulations, queryCurrentAsset} = useInvestiment()

  // useEffect(() => {
  //   querySimulations()
  // }, [])

  useEffect(() => {
    queryCurrentAsset()
  }, [assets])

  return (
    <>
      <AssetHeader />
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
