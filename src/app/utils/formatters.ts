export const currencyFormatter = (value: number): string => {
  const options = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }

  return new Intl.NumberFormat('pt-BR', options).format(value)
}

export const percentualFormatter = (value: number): string => {
  const options = {
    style: 'percent',
    minimumFractionDigits: 2,
  }

  return new Intl.NumberFormat('pt-BR', options).format(value)
}

export const dateFormatter = (dateInt: any) => {
  const preFormattedDate = dateInt.replace(/-/g, '/').replace(/T.+/, '')
  const date = new Date(preFormattedDate)

  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return formatter.format(date)
}

export const currencyUnformatter = (value: string): string => {
  const strippedValue = value.replace(/[^\d]/g, '')

  return (parseFloat(strippedValue) / 100).toString()
}

export const percentualUnformatter = (value: string): string => {
  const strippedValue = value.replace(/[^\d]/g, '')

  return (parseFloat(strippedValue) / 10000).toString()
}

export const floatUnformatter = (value: string): string => {
  const strippedValue = value.replace(/[^\d]/g, '')

  return (parseFloat(strippedValue) / 100).toString()
}

export const transformStringInputInNumber = (value: string): number | void => {
  if (!value) {
    return
  }

  const strippedValue = value.replace(/[^\d]/g, '')

  const parsedValue = parseFloat(strippedValue)

  if (isNaN(parsedValue)) {
    return
  }

  return parsedValue
}

export const formatPercentageInput = (input: string): string => {
  const parsedInput = transformStringInputInNumber(input)

  let formattedValue = ''

  if (parsedInput) {
    formattedValue = percentualFormatter(parsedInput / 10000)
    formattedValue = `% ${formattedValue.slice(0, -1)}`
  }

  return formattedValue
}

export const formatCurrencyInput = (input: string): string => {
  const parsedInput = transformStringInputInNumber(input)

  let formattedValue = ''

  if (parsedInput) {
    formattedValue = currencyFormatter(parsedInput / 100)
  }

  return formattedValue
}
