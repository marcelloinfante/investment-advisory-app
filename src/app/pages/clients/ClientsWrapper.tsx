/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {UserHeader} from '../../../_metronic/partials'
import {ClientCard} from '../../../_metronic/partials/content/cards/ClientCard'

import {useInvestiment} from '../../context/Investiment'
import {CreateClientModal} from '../../../_metronic/partials/modals/create-client/CreateClientModal'

const DashboardPage: FC = () => {
  const [showModal, setShowModal] = useState(false)

  const {clients, queryClients} = useInvestiment()

  useEffect(() => {
    queryClients()
  }, [])

  return (
    <>
      <UserHeader />
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>Clientes</h3>

        <div className='d-flex flex-wrap my-2'>
          <a
            onClick={() => setShowModal(true)}
            className='btn btn-primary btn-sm'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_client'
          >
            Adicionar Novo Cliente
          </a>
        </div>
      </div>

      <div className='row g-6 g-xl-9'>
        {clients.map(
          (client: {
            id: number
            email: string
            last_name: string
            first_name: string
            number_of_assets: number
            total_in_custody: number
          }): any => {
            return (
              <div className='col-md-6 col-xl-4'>
                <ClientCard
                  id={client.id}
                  firstName={client?.first_name}
                  lastName={client?.last_name}
                  email={client?.email}
                  numberOfAssets={client?.number_of_assets}
                  totalInCustody={client?.total_in_custody}
                />
              </div>
            )
          }
        )}
      </div>

      <CreateClientModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  )
}

const ClientsWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.USER'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {ClientsWrapper}
