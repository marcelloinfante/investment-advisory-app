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

  return `% ${new Intl.NumberFormat('pt-BR', options).format(value / 10000).slice(0, -1)}`
}

export const dateFormatter = (value: string): string => {
  return value
    .replace(/\D+/g, '')
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/^(\d{2}\/\d{2})(\d)/, '$1/$2')
    .slice(0, 10)
}

export const currencyUnformatter = (value: string): number => {
  const strippedValue = value.replace(/[^\d]/g, '')

  return parseFloat(strippedValue) / 100
}

export const percentualUnformatter = (value: string): number => {
  const strippedValue = value.replace(/[^\d]/g, '')

  return parseFloat(strippedValue) / 10000
}
