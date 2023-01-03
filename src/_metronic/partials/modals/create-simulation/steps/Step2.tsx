/* eslint-disable jsx-a11y/anchor-is-valid */
import {formatPercentageInput} from '../../../../../app/utils/formatters'

const Step2 = ({formik}: any) => {
  const dateFormatter = (value: string): string => {
    return value
      .replace(/\D+/g, '')
      .replace(/^(\d{2})(\d)/, '$1/$2')
      .replace(/^(\d{2}\/\d{2})(\d)/, '$1/$2')
      .slice(0, 10)
  }

  const setExpirationDateValue = (value: string) => {
    formik.setFieldValue('new_asset_expiration_date', dateFormatter(value))
  }

  const setMinimumRateValue = (value: string): void => {
    const formattedValue = formatPercentageInput(value)

    if (!formattedValue) {
      formik.setFieldValue('new_asset_minimum_rate', '')
    }

    formik.setFieldValue('new_asset_minimum_rate', formattedValue)
  }

  const setMaximumRateValue = (value: string): void => {
    const formattedValue = formatPercentageInput(value)

    if (!formattedValue) {
      formik.setFieldValue('new_asset_maximum_rate', '')
    }

    formik.setFieldValue('new_asset_maximum_rate', formattedValue)
  }

  const setDurationValue = (value: string): void => {
    const formattedValue = formatPercentageInput(value)

    if (!formattedValue) {
      formik.setFieldValue('new_asset_duration', '')
    }

    const strippedValue = formattedValue.substring(2)

    formik.setFieldValue('new_asset_duration', strippedValue)
  }

  return (
    <div className='pb-5' data-kt-stepper-element='content'>
      <div className='w-100'>
        <div className='fv-row mb-7'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Código</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Insira o código do ativo'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            placeholder='AESL14'
            {...formik.getFieldProps('new_asset_code')}
            onChange={(e) => formik.setFieldValue('new_asset_code', e.target.value.toUpperCase())}
          />
          {formik.touched.new_asset_code && formik.errors.new_asset_code && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.new_asset_code}</span>
              </div>
            </div>
          )}
        </div>

        <div className='fv-row mb-7'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Emissor</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Insira o emissor do ativo'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            placeholder='AES SUL DISTRIBUIDORA GAUCHA DE ENERGIA S/A'
            {...formik.getFieldProps('new_asset_issuer')}
            onChange={(e) => formik.setFieldValue('new_asset_issuer', e.target.value.toUpperCase())}
          />
          {formik.touched.new_asset_issuer && formik.errors.new_asset_issuer && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.new_asset_issuer}</span>
              </div>
            </div>
          )}
        </div>

        <div className='fv-row mb-7'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Data de Vencimento</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Insira a data da vencimento do ativo'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            placeholder='dd/mm/aaaa'
            {...formik.getFieldProps('new_asset_expiration_date')}
            onChange={(e) => setExpirationDateValue(e.target.value)}
          />
          {formik.touched.new_asset_expiration_date && formik.errors.new_asset_expiration_date && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.new_asset_expiration_date}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Taxa Mínima</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Insira a taxa mínima do ativo'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            placeholder='% 0,00'
            {...formik.getFieldProps('new_asset_minimum_rate')}
            onChange={(e) => setMinimumRateValue(e.target.value)}
          />
          {formik.touched.new_asset_minimum_rate && formik.errors.new_asset_minimum_rate && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.new_asset_minimum_rate}</span>
              </div>
            </div>
          )}
        </div>

        <div className='fv-row mb-7'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Taxa Máxima</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Insira a taxa máxima do ativo'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            placeholder='% 0,00'
            {...formik.getFieldProps('new_asset_maximum_rate')}
            onChange={(e) => setMaximumRateValue(e.target.value)}
          />
          {formik.touched.new_asset_maximum_rate && formik.errors.new_asset_maximum_rate && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.new_asset_maximum_rate}</span>
              </div>
            </div>
          )}
        </div>

        <div className='fv-row mb-7'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Duration</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Insira a duration do ativo'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            placeholder='0'
            {...formik.getFieldProps('new_asset_duration')}
            onChange={(e) => setDurationValue(e.target.value)}
          />
          {formik.touched.new_asset_duration && formik.errors.new_asset_duration && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.new_asset_duration}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export {Step2}
