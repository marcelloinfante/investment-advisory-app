/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useRef} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import * as Yup from 'yup'

import {KTSVG} from '../../../helpers'

import {
  currencyUnformatter,
  percentualUnformatter,
  formatPercentageInput,
  formatCurrencyInput,
} from '../../../../app/utils/formatters'

import {useInvestiment} from '../../../../app/context/Investiment'
import {useFirebase} from '../../../../app/context/Firebase'

type Props = {
  show: boolean
  handleClose: () => void
}

const modalsRoot = document.getElementById('root-modals') || document.body

const initialValues = {
  code: '',
  issuer: '',
  quantity: '',
  rate_index: '',
  entrance_rate: '',
  volume_applied: '',
  expiration_date: '',
  application_date: '',
}

const registrationSchema = Yup.object().shape({
  code: Yup.string().required('Obrigatório'),
  issuer: Yup.string().required('Obrigatório'),
  quantity: Yup.string().required('Obrigatório'),
  rate_index: Yup.string().required('Obrigatório'),
  entrance_rate: Yup.string().required('Obrigatório'),
  volume_applied: Yup.string().required('Obrigatório'),
  expiration_date: Yup.string().required('Obrigatório'),
  application_date: Yup.string().required('Obrigatório'),
})

const dateFormatter = (value: string): string => {
  return value
    .replace(/\D+/g, '')
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/^(\d{2}\/\d{2})(\d)/, '$1/$2')
    .slice(0, 10)
}

const CreateAssetModal = ({show, handleClose}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)

  const {createAsset, currentClient} = useInvestiment()
  const {registerEvent} = useFirebase()

  const closeModal = () => {
    handleClose()
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      registerEvent('asset_form_submit')

      try {
        const params = {
          ...values,
          client_id: currentClient.id,
          quantity: parseInt(values.quantity),
          entrance_rate: percentualUnformatter(values.entrance_rate),
          volume_applied: currencyUnformatter(values.volume_applied),
        }

        const result = await createAsset(params)

        if (!!result?.error) {
          setStatus('Ocorreu um erro')
          setSubmitting(false)
          console.error(result?.error)
        } else {
          closeModal()

          registerEvent('asset_create')
        }
      } catch (error) {
        console.error(error)
        setStatus(error)
        setSubmitting(false)

        registerEvent('asset_create_error')
      }
    },
  })

  const setEntranceRateValue = (value: string): void => {
    const formattedValue = formatPercentageInput(value)

    if (!formattedValue) {
      formik.setFieldValue('entrance_rate', '')
    }

    formik.setFieldValue('entrance_rate', formattedValue)
  }

  const setVolumeAppliedValue = (value: string): void => {
    const formattedValue = formatCurrencyInput(value)

    if (!formattedValue) {
      formik.setFieldValue('volume_applied', '')
    }

    formik.setFieldValue('volume_applied', formattedValue)
  }

  const setApplicationDateValue = (value: string) => {
    formik.setFieldValue('application_date', dateFormatter(value))
  }

  const setExpirationDateValue = (value: string) => {
    formik.setFieldValue('expiration_date', dateFormatter(value))
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
        <h2>Adicionar Novo Ativo</h2>
        {/* begin::Close */}
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={closeModal}>
          <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
        </div>
        {/* end::Close */}
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        {formik.status && (
          <div className='alert alert-danger mb-10'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        )}
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
              <div className='current d-block d-md-flex' data-kt-stepper-element='content'>
                <div className='w-10'>
                  {/*begin::Form Group */}
                  <div className='fv-row mb-10'>
                    <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                      <span className='required'>Código</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Digite o código do ativo'
                      ></i>
                    </label>
                    <input
                      type='text'
                      placeholder='AESL14'
                      {...formik.getFieldProps('code')}
                      className='form-control form-control-lg form-control-solid'
                      onChange={(e) => formik.setFieldValue('code', e.target.value.toUpperCase())}
                    />
                    {formik.touched.code && formik.errors.code && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.code}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/*end::Form Group */}
                </div>
                <div className='w-100 ms-md-10'>
                  {/*begin::Form Group */}
                  <div className='fv-row mb-10'>
                    <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                      <span className='required'>Emissor</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Digite o emisso do ativo'
                      ></i>
                    </label>
                    <input
                      type='text'
                      placeholder='AES SUL DISTRIBUIDORA GAUCHA DE ENERGIA S/A'
                      {...formik.getFieldProps('issuer')}
                      className='form-control form-control-lg form-control-solid'
                      onChange={(e) => formik.setFieldValue('issuer', e.target.value.toUpperCase())}
                    />
                    {formik.touched.issuer && formik.errors.issuer && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.issuer}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/*end::Form Group */}
                </div>
              </div>

              <div className='current d-block d-md-flex' data-kt-stepper-element='content'>
                <div className='w-md-50'>
                  {/*begin::Form Group */}
                  <div className='fv-row mb-10'>
                    <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                      <span className='required'>Indexador</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Digite o indexador do ativo'
                      ></i>
                    </label>
                    <input
                      type='text'
                      placeholder='CDI'
                      {...formik.getFieldProps('rate_index')}
                      className='form-control form-control-lg form-control-solid'
                      onChange={(e) =>
                        formik.setFieldValue('rate_index', e.target.value.toUpperCase())
                      }
                    />
                    {formik.touched.rate_index && formik.errors.rate_index && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.rate_index}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/*end::Form Group */}
                </div>

                <div className='w-md-50 ms-md-10'>
                  {/*begin::Form Group */}
                  <div className='fv-row mb-10'>
                    <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                      <span className='required'>Taxa Entrada</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Digite a taxa de entrada do ativo'
                      ></i>
                    </label>
                    <input
                      type='text'
                      placeholder='% 0,00'
                      {...formik.getFieldProps('entrance_rate')}
                      onChange={(e) => setEntranceRateValue(e.target.value)}
                      className='form-control form-control-lg form-control-solid'
                    />
                    {formik.touched.entrance_rate && formik.errors.entrance_rate && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.entrance_rate}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/*end::Form Group */}
                </div>

                <div className='w-md-50 ms-md-10'>
                  {/*begin::Form Group */}
                  <div className='fv-row mb-10'>
                    <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                      <span className='required'>Quantidade</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Digite a quantidade de títulos do ativo'
                      ></i>
                    </label>
                    <input
                      type='text'
                      placeholder='0'
                      {...formik.getFieldProps('quantity')}
                      className='form-control form-control-lg form-control-solid'
                      onChange={(e) =>
                        formik.setFieldValue('quantity', e.target.value.replace(/[^\d]/g, ''))
                      }
                    />
                    {formik.touched.quantity && formik.errors.quantity && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.quantity}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/*end::Form Group */}
                </div>
              </div>

              <div className='current d-block d-md-flex' data-kt-stepper-element='content'>
                <div className='w-md-50'>
                  {/*begin::Form Group */}
                  <div className='fv-row mb-10'>
                    <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                      <span className='required'>Volume Aplicado</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Digite o volume monetário aplicado'
                      ></i>
                    </label>
                    <input
                      type='text'
                      placeholder='R$ 0,00'
                      {...formik.getFieldProps('volume_applied')}
                      onChange={(e) => setVolumeAppliedValue(e.target.value)}
                      className='form-control form-control-lg form-control-solid'
                    />
                    {formik.touched.volume_applied && formik.errors.volume_applied && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.volume_applied}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/*end::Form Group */}
                </div>

                <div className='w-md-50 ms-md-10'>
                  {/*begin::Form Group */}
                  <div className='fv-row mb-10'>
                    <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                      <span className='required'>Data Aplicação</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Digite a data de quando foi feita a aplicação'
                      ></i>
                    </label>
                    <input
                      type='text'
                      placeholder='dd/mm/aaaa'
                      {...formik.getFieldProps('application_date')}
                      onChange={(e) => setApplicationDateValue(e.target.value)}
                      className='form-control form-control-lg form-control-solid'
                    />
                    {formik.touched.application_date && formik.errors.application_date && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.application_date}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/*end::Form Group */}
                </div>

                <div className='w-md-50 ms-md-10'>
                  {/*begin::Form Group */}
                  <div className='fv-row mb-10'>
                    <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                      <span className='required'>Data Expiração</span>
                      <i
                        className='fas fa-exclamation-circle ms-2 fs-7'
                        data-bs-toggle='tooltip'
                        title='Digite a data de expiração do ativo'
                      ></i>
                    </label>
                    <input
                      type='text'
                      placeholder='dd/mm/aaaa'
                      {...formik.getFieldProps('expiration_date')}
                      onChange={(e) => setExpirationDateValue(e.target.value)}
                      className='form-control form-control-lg form-control-solid'
                    />
                    {formik.touched.expiration_date && formik.errors.expiration_date && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.expiration_date}</span>
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
                    Criar Novo Ativo
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

export {CreateAssetModal}
