/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {ClientHeader} from '../../../_metronic/partials'

import {useInvestiment} from '../../context/Investiment'
import {CreateAssetModal} from '../../../_metronic/partials/modals/create-asset/CreateAssetModal'

import {AssetsTable} from '../../../_metronic/partials/widgets'

const DashboardPage: FC = () => {
  const [showModal, setShowModal] = useState(false)

  const {assets, queryAssets, queryCurrentClient} = useInvestiment()

  useEffect(() => {
    queryAssets()
  }, [])

  useEffect(() => {
    queryCurrentClient()
  }, [assets])

  return (
    <>
      <ClientHeader />

      <AssetsTable className='mb-5 mb-xl-8' assets={assets} openModal={() => setShowModal(true)} />

      <CreateAssetModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  )
}

const AssetsWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.CLIENT'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {AssetsWrapper}