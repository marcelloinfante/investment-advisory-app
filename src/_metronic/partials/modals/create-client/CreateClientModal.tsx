/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useRef} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import * as Yup from 'yup'

import {KTSVG} from '../../../helpers'

import {useInvestiment} from '../../../../app/context/Investiment'
import {useFirebase} from '../../../../app/context/Firebase'

type Props = {
  show: boolean
  handleClose: () => void
}

const modalsRoot = document.getElementById('root-modals') || document.body

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
}

const registrationSchema = Yup.object().shape({
  first_name: Yup.string().required('Obrigatório'),
  last_name: Yup.string().required('Obrigatório'),
  email: Yup.string().required('Obrigatório').email('Formato do email errado'),
})

const CreateClientModal = ({show, handleClose}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)

  const {createClient} = useInvestiment()
  const {registerEvent} = useFirebase()

  const closeModal = () => {
    handleClose()
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      registerEvent('client_form_submit')

      try {
        createClient(values)
        closeModal()

        registerEvent('client_create')
      } catch (error) {
        console.error(error)
        setStatus('The registration details is incorrect')
        setSubmitting(false)

        registerEvent('client_create_error')
      }
    },
  })

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
            <form noValidate id='kt_modal_create_app_form' onSubmit={formik.handleSubmit}>
              <div className='current' data-kt-stepper-element='content'>
                <div className='w-100'>
                  {/*begin::Form Group */}
                  <div className='fv-row mb-10'>
                    <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                      <span className='required'>Primeiro Nome</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Digite o seu primeiro nome'
                      ></i>
                    </label>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      {...formik.getFieldProps('first_name')}
                    />
                    {formik.touched.first_name && formik.errors.first_name && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.first_name}</span>
                        </div>
                      </div>
                    )}
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
                      {...formik.getFieldProps('last_name')}
                    />
                    {formik.touched.last_name && formik.errors.last_name && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.last_name}</span>
                        </div>
                      </div>
                    )}
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
                      {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.email}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/*end::Form Group */}
                </div>
              </div>

              {/*begin::Actions */}
              <div className='d-flex flex-stack pt-10'>
                <div>
                  <button
                    disabled={
                      formik.isSubmitting || !formik.isValid || !Object.keys(formik.touched).length
                    }
                    type='submit'
                    className='btn btn-lg btn-primary'
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
