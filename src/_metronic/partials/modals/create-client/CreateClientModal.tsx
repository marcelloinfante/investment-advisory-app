/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useRef} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {KTSVG} from '../../../helpers'

import {useInvestiment} from '../../../../app/context/Investiment'

type Props = {
  show: boolean
  handleClose: () => void
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateClientModal = ({show, handleClose}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const [data, setData] = useState<any>({})

  const {createClient} = useInvestiment()

  const updateData = (fieldsToUpdate: Partial<any>) => {
    const updatedData = {...data, ...fieldsToUpdate}
    setData(updatedData)
  }

  const submit = () => {
    createClient(data)
    closeModal()
  }

  const closeModal = () => {
    setData({})
    handleClose()
  }

  return createPortal(
    <Modal
      id='kt_modal_create_client'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={closeModal}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>Adicionar Novo Cliente</h2>
        {/* begin::Close */}
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={closeModal}>
          <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
        </div>
        {/* end::Close */}
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        {/*begin::Stepper */}
        <div
          ref={stepperRef}
          className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
          id='kt_modal_create_app_stepper'
        >
          {/*begin::Content */}
          <div className='flex-row-fluid py-lg-5 px-lg-15'>
            {/*begin::Form */}
            <form noValidate id='kt_modal_create_app_form'>
              <div className='current' data-kt-stepper-element='content'>
                <div className='w-100'>
                  {/*begin::Form Group */}
                  <div className='fv-row mb-10'>
                    <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                      <span className='required'>Nome</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Digite o seu primeiro nome'
                      ></i>
                    </label>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      value={data.first_name}
                      onChange={(e) => updateData({first_name: e.target.value})}
                    />
                  </div>
                  {/*end::Form Group */}
                </div>
              </div>

              <div className='current' data-kt-stepper-element='content'>
                <div className='w-100'>
                  {/*begin::Form Group */}
                  <div className='fv-row mb-10'>
                    <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                      <span className='required'>Sobrenome</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Digite o seu sobrenome'
                      ></i>
                    </label>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      value={data.last_name}
                      onChange={(e) => updateData({last_name: e.target.value})}
                    />
                  </div>
                  {/*end::Form Group */}
                </div>
              </div>

              <div className='current' data-kt-stepper-element='content'>
                <div className='w-100'>
                  {/*begin::Form Group */}
                  <div className='fv-row mb-10'>
                    <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                      <span className='required'>Email</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Digite o seu email'
                      ></i>
                    </label>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      value={data.email}
                      onChange={(e) => updateData({email: e.target.value})}
                    />
                  </div>
                  {/*end::Form Group */}
                </div>
              </div>

              {/*begin::Actions */}
              <div className='d-flex flex-stack pt-10'>
                <div>
                  <button
                    disabled={!data?.first_name || !data?.last_name || !data?.email}
                    type='button'
                    className='btn btn-lg btn-primary'
                    onClick={submit}
                  >
                    Criar Novo Cliente
                  </button>
                </div>
              </div>
              {/*end::Actions */}
            </form>
            {/*end::Form */}
          </div>
          {/*end::Content*/}
        </div>
        {/* end::Stepper */}
      </div>
    </Modal>,
    modalsRoot
  )
}

export {CreateClientModal}
