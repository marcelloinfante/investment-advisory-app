/* eslint-disable jsx-a11y/anchor-is-valid */
import {formatPercentageInput} from '../../../../../app/utils/formatters'

const Step3 = ({formik}: any) => {
  const setValueToField = (value: string, field: string): void => {
    const formattedValue = formatPercentageInput(value)

    if (!formattedValue) {
      formik.setFieldValue(field, '')
    }

    formik.setFieldValue(field, formattedValue)
  }

  return (
    <div className='pb-5' data-kt-stepper-element='content'>
      <div className='w-100'>
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Taxa Mercado</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Insira a taxa de mercado'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid mb-5'
            placeholder='% 0,00'
            {...formik.getFieldProps('market_rate')}
            onChange={(e) => setValueToField(e.target.value, 'market_rate')}
          />

          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Taxa Indicativa</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Insira a taxa indicativa'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid mb-5'
            placeholder='% 0,00'
            {...formik.getFieldProps('new_asset_indicative_rate')}
            onChange={(e) => setValueToField(e.target.value, 'new_asset_indicative_rate')}
          />

          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Nova Taxa Sugerida</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Insira a nova taxa sugerida'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid mb-5'
            placeholder='% 0,00'
            {...formik.getFieldProps('new_asset_suggested_rate')}
            onChange={(e) => setValueToField(e.target.value, 'new_asset_suggested_rate')}
          />

          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>CDI Médio</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Insira o cdi médio'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid mb-5'
            placeholder='% 0,00'
            {...formik.getFieldProps('average_cdi')}
            onChange={(e) => setValueToField(e.target.value, 'average_cdi')}
          />
        </div>
      </div>
    </div>
  )
}

export {Step3}
