/* eslint-disable jsx-a11y/anchor-is-valid */
import {formatCurrencyInput} from '../../../../../app/utils/formatters'

const Step4 = ({formik}: any) => {
  const setValueToField = (value: string, field: string): void => {
    const formattedValue = formatCurrencyInput(value)

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
            <span className='required'>Resgate à Mercado</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Insira a data da cotação'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid mb-5'
            placeholder='R$ 0,00'
            {...formik.getFieldProps('market_redemption')}
            onChange={(e) => setValueToField(e.target.value, 'market_redemption')}
          />

          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Volume Curva</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Insira a data da cotação'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid mb-5'
            placeholder='R$ 0,00'
            {...formik.getFieldProps('curve_volume')}
            onChange={(e) => setValueToField(e.target.value, 'curve_volume')}
          />
        </div>
      </div>
    </div>
  )
}

export {Step4}
