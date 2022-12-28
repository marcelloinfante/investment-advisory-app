/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {ClientHeader} from '../../../_metronic/partials'
import {Card2} from '../../../_metronic/partials/content/cards/Card2'

import {useInvestiment} from '../../context/Investiment'
import {CreateClientModal} from '../../../_metronic/partials/modals/create-client/CreateClientModal'

const DashboardPage: FC = () => {
  const [showModal, setShowModal] = useState(false)

  const {currentClient, queryClients} = useInvestiment()

  // useEffect(() => {
  //   queryClients()
  // }, [])

  return (
    <>
      <ClientHeader />
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>Ativos</h3>

        <div className='d-flex flex-wrap my-2'>
          <a
            onClick={() => setShowModal(true)}
            className='btn btn-primary btn-sm'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_client'
          >
            Adicionar Novo Ativo
          </a>
        </div>
      </div>

      <CreateClientModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  )
}

const ClientWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.USER'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {ClientWrapper}
