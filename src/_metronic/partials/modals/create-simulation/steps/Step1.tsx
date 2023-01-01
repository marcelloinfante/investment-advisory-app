/* eslint-disable jsx-a11y/anchor-is-valid */
const Step1 = ({formik}: any) => {
  const dateFormatter = (value: string): string => {
    return value
      .replace(/\D+/g, '')
      .replace(/^(\d{2})(\d)/, '$1/$2')
      .replace(/^(\d{2}\/\d{2})(\d)/, '$1/$2')
      .slice(0, 10)
  }

  const setQuotationDateValue = (value: string) => {
    formik.setFieldValue('quotation_date', dateFormatter(value))
  }

  return (
    <div className='current' data-kt-stepper-element='content'>
      <div className='w-100'>
        {/*begin::Form Group */}
        <div className='fv-row mb-10'>
          <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className='required'>Data da Cotação</span>
            <i
              className='fas fa-exclamation-circle ms-2 fs-7'
              data-bs-toggle='tooltip'
              title='Insira a data da cotação'
            ></i>
          </label>
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            placeholder='dd/mm/aaaa'
            {...formik.getFieldProps('quotation_date')}
            onChange={(e) => setQuotationDateValue(e.target.value)}
          />
          {formik.touched.quotation_date && formik.errors.quotation_date && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.quotation_date}</span>
              </div>
            </div>
          )}
        </div>
        {/*end::Form Group */}
      </div>
    </div>
  )
}

export {Step1}
