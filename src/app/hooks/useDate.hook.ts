const useDate = () => {
  const date = new Date()
  return {
    date: date,
    iso: date.toISOString()
  }
}

export {
  useDate
}