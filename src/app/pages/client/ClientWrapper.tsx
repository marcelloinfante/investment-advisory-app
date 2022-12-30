/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {ClientHeader} from '../../../_metronic/partials'

import {useInvestiment} from '../../context/Investiment'
import {CreateAssetModal} from '../../../_metronic/partials/modals/create-asset/CreateAssetModal'

import {TablesWidget11} from '../../../_metronic/partials/widgets'

const DashboardPage: FC = () => {
  const [showModal, setShowModal] = useState(false)

  const {assets, queryAssets} = useInvestiment()

  useEffect(() => {
    queryAssets()
  }, [])

  return (
    <>
      <ClientHeader />

      <TablesWidget11
        className='mb-5 mb-xl-8'
        assets={assets}
        openModal={() => setShowModal(true)}
      />

      <CreateAssetModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  )
}

const ClientWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.CLIENT'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {ClientWrapper}
