export default (specializations, prices, experiences) => {
  const tags = specializations.map((el) => el.name)

  const price = prices.map((el) => el.name)

  const selectPrice = price.reduce((acc, el) => {
    if (el === 'Бесплатно' || el === 'По договоренности') {
      return { ...acc, [el]: [el] }
    }
    const key = `До ${el} руб.`
    let arr = ['Бесплатно']
    const numPrice = Number(el.split(' ').join(''))
    for (let i = 500; i <= numPrice; i += 500) {
      const str = i.toString()
      if (str.length <= 3) {
        arr.push(`${str} руб`)
      } else {
        arr.push(`${str.slice(0, -3)} ${str.slice(-3)} руб`)
      }
    }
    return { ...acc, [key]: arr }
  }, {})

  const byTags = specializations.reduce((acc, el) => {
    if (el.group_specializations_id) {
      const key = el.group_specializations_id
      acc[key] = acc[key] || []
      return { ...acc, [key]: [...acc[key], el.name] }
    }
    if (el.sponsor) {
      return acc
    }
    acc.rest = acc.rest || []
    return { ...acc, rest: [...acc.rest, el.name] }
  }, {})

  const sponsors = specializations.filter((el) => el.sponsor).map((el) => el.name)

  const experience = experiences.reduce((acc, el) => {
    const key = `${el.name} лет`
    return { ...acc, [key]: el.name }
  }, {})

  return {
    tags,
    price,
    selectPrice,
    byTags,
    experience,
    sponsors,
  }
}
