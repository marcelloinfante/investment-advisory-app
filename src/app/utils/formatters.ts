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

export const dateFormatter = (dateInt: number) => {
  const date = new Date(dateInt)
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return formatter.format(date)
}

export const currencyUnformatter = (value: string): number => {
  const strippedValue = value.replace(/[^\d]/g, '')

  return parseFloat(strippedValue) / 100
}

export const percentualUnformatter = (value: string): number => {
  const strippedValue = value.replace(/[^\d]/g, '')

  return parseFloat(strippedValue) / 10000
}
