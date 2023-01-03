/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useRef} from 'react'
import {createPortal} from 'react-dom'
import {Modal} from 'react-bootstrap'
import {useFormik} from 'formik'
import * as Yup from 'yup'

import {StepperComponent} from '../../../assets/ts/components'
import {KTSVG} from '../../../helpers'
import {Step1} from './steps/Step1'
import {Step2} from './steps/Step2'
import {Step3} from './steps/Step3'
import {Step4} from './steps/Step4'

import {
  floatUnformatter,
  percentualUnformatter,
  currencyUnformatter,
} from '../../../../app/utils/formatters'

import {useInvestiment} from '../../../../app/context/Investiment'
import {useFirebase} from '../../../../app/context/Firebase'

type Props = {
  show: boolean
  handleClose: () => void
}

const modalsRoot = document.getElementById('root-modals') || document.body

const initialValues = {
  market_rate: '',
  average_cdi: '',
  curve_volume: '',
  new_asset_code: '',
  quotation_date: '',
  new_asset_issuer: '',
  market_redemption: '',
  new_asset_duration: '',
  new_asset_minimum_rate: '',
  new_asset_maximum_rate: '',
  new_asset_suggested_rate: '',
  new_asset_indicative_rate: '',
  new_asset_expiration_date: '',
}

const registrationSchema = Yup.object().shape({
  market_rate: Yup.string().required('Obrigatório'),
  average_cdi: Yup.string().required('Obrigatório'),
  curve_volume: Yup.string().required('Obrigatório'),
  new_asset_code: Yup.string().required('Obrigatório'),
  quotation_date: Yup.string().required('Obrigatório'),
  new_asset_issuer: Yup.string().required('Obrigatório'),
  market_redemption: Yup.string().required('Obrigatório'),
  new_asset_duration: Yup.string().required('Obrigatório'),
  new_asset_minimum_rate: Yup.string().required('Obrigatório'),
  new_asset_maximum_rate: Yup.string().required('Obrigatório'),
  new_asset_suggested_rate: Yup.string().required('Obrigatório'),
  new_asset_indicative_rate: Yup.string().required('Obrigatório'),
  new_asset_expiration_date: Yup.string().required('Obrigatório'),
})

const CreateSimulationModal = ({show, handleClose}: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)

  const {currentClient, currentAsset, createSimulation} = useInvestiment()
  const {registerEvent} = useFirebase()

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      registerEvent('simulation_form_submit')

      try {
        const params = {
          ...values,
          asset_id: currentAsset.id,
          client_id: currentClient.id,
          market_rate: percentualUnformatter(values.market_rate),
          average_cdi: percentualUnformatter(values.average_cdi),
          curve_volume: currencyUnformatter(values.curve_volume),
          new_asset_duration: floatUnformatter(values.new_asset_duration),
          market_redemption: currencyUnformatter(values.market_redemption),
          new_asset_minimum_rate: percentualUnformatter(values.new_asset_minimum_rate),
          new_asset_maximum_rate: percentualUnformatter(values.new_asset_maximum_rate),
          new_asset_suggested_rate: percentualUnformatter(values.new_asset_suggested_rate),
          new_asset_indicative_rate: percentualUnformatter(values.new_asset_indicative_rate),
        }

        const result = await createSimulation(params)

        if (!!result?.error) {
          setStatus('Ocorreu um erro')
          setSubmitting(false)
          console.error(result?.error)

          registerEvent('simulation_create_error')
        } else {
          closeModal()

          registerEvent('simulation_create')
        }
      } catch (error) {
        console.error(error)
        setStatus('The registration details is incorrect')
        setSubmitting(false)

        registerEvent('simulation_create_error')
      }
    },
  })

  const closeModal = () => {
    handleClose()
    formik.resetForm()
  }

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()
  }

  const nextStep = () => {
    if (!stepper.current) {
      return
    }

    if (isCurrentStepInvalid()) {
      return
    }

    registerEvent('simulation_modal_next_step', {
      step: stepper.current.getCurrentStepIndex(),
    })

    stepper.current.goNext()
  }

  const isCurrentStepInvalid = (): boolean => {
    if (!stepper.current) {
      return true
    }

    if (stepper.current.getCurrentStepIndex() === 1) {
      if (isFirstStepInvalid()) {
        return true
      }
    }

    if (stepper.current.getCurrentStepIndex() === 2) {
      if (isSecondStepInvalid()) {
        return true
      }
    }

    if (stepper.current.getCurrentStepIndex() === 3) {
      if (isThirdStepInvalid()) {
        return true
      }
    }

    if (stepper.current.getCurrentStepIndex() === 4) {
      if (isFourthStepInvalid()) {
        return true
      }
    }

    return false
  }

  const isFirstStepInvalid = (): boolean =>
    !formik.touched.quotation_date || !!formik.errors.quotation_date

  const isSecondStepInvalid = (): boolean =>
    !!formik.errors.new_asset_code ||
    !!formik.errors.new_asset_issuer ||
    !!formik.errors.new_asset_expiration_date ||
    !!formik.errors.new_asset_minimum_rate ||
    !!formik.errors.new_asset_maximum_rate ||
    !!formik.errors.new_asset_duration

  const isThirdStepInvalid = (): boolean =>
    !!formik.errors.market_rate ||
    !!formik.errors.new_asset_indicative_rate ||
    !!formik.errors.new_asset_suggested_rate ||
    !!formik.errors.average_cdi

  const isFourthStepInvalid = (): boolean =>
    !!formik.errors.market_redemption || !!formik.errors.curve_volume

  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={closeModal}
      onEntered={loadStepper}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>Criar Nova Simulação</h2>
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
          {/* begin::Aside*/}
          <div className='d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px mb-10'>
            {/* begin::Nav*/}
            <div className='stepper-nav ps-lg-10'>
              {/* begin::Step 1*/}
              <div className='stepper-item current' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>1</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Data da Cotação</h3>

                    <div className='stepper-desc'>Defina a data da cotação</div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-40px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 1*/}

              {/* begin::Step 2*/}
              <div className='stepper-item' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>2</span>
                  </div>
                  {/* begin::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Novo Ativo</h3>

                    <div className='stepper-desc'>Insira o novo ativo</div>
                  </div>
                  {/* begin::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-40px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 2*/}

              {/* begin::Step 3*/}
              <div className='stepper-item' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>3</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Taxas de Mercado</h3>

                    <div className='stepper-desc'>Defina as taxas de mercado</div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className='stepper-line h-40px'></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 3*/}

              {/* begin::Step 4*/}
              <div className='stepper-item' data-kt-stepper-element='nav'>
                {/* begin::Wrapper*/}
                <div className='stepper-wrapper'>
                  {/* begin::Icon*/}
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>4</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>Ativo</h3>

                    <div className='stepper-desc'>Valores do ativo</div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}
              </div>
              {/* end::Step 4*/}
            </div>
            {/* end::Nav*/}
          </div>
          {/* begin::Aside*/}

          {/*begin::Content */}
          <div className='flex-row-fluid py-lg-5 px-lg-15'>
            {/*begin::Form */}
            <form noValidate id='kt_modal_create_app_form' onSubmit={formik.handleSubmit}>
              {formik.status && (
                <div className='alert alert-danger mb-10'>
                  <div className='alert-text font-weight-bold'>{formik.status}</div>
                </div>
              )}

              <Step1 formik={formik} />
              <Step2 formik={formik} />
              <Step3 formik={formik} />
              <Step4 formik={formik} />

              {/*begin::Actions */}
              <div className='d-flex flex-stack pt-10'>
                <div className='me-2'>
                  <button
                    type='button'
                    className='btn btn-lg btn-light-primary me-3'
                    data-kt-stepper-action='previous'
                    onClick={prevStep}
                  >
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr063.svg'
                      className='svg-icon-3 me-1'
                    />{' '}
                    Voltar
                  </button>
                </div>
                <div>
                  <button
                    type='submit'
                    className='btn btn-lg btn-primary'
                    data-kt-stepper-action='submit'
                  >
                    Concluir{' '}
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr064.svg'
                      className='svg-icon-3 ms-2 me-0'
                    />
                  </button>

                  <button
                    type='button'
                    className='btn btn-lg btn-primary'
                    data-kt-stepper-action='next'
                    onClick={nextStep}
                  >
                    Continuar{' '}
                    <KTSVG
                      path='/media/icons/duotune/arrows/arr064.svg'
                      className='svg-icon-3 ms-1 me-0'
                    />
                  </button>
                </div>
              </div>
              {/*end::Actions */}
            </form>
            {/*end::Form */}
          </div>
          {/*end::Content */}
        </div>
        {/* end::Stepper */}
      </div>
    </Modal>,
    modalsRoot
  )
}

export {CreateSimulationModal}
