import axios from '../server/axios.js'
import routes from '../server/routes.js'

const mentors = []

const loader = async (items, path) => {
  try {
    const result = await axios.get(path())
    if (items === 'mentors') {
      mentors.push(...result.data.data[items])
      mentors.forEach((mentor) => {
        const tags = mentor.specializations.map((el) => el.name)
        mentor.tags = tags
      })
    }
    return result.data.data[items]
  } catch (err) {
    console.log(err)
    return err
  }
}

export const loadingMentors = async () => await loader('mentors', routes.mentorsPath)
export const loadingSpecializations = async () =>
  await loader('specializations', routes.specializationsPath)
export const loadingExperiences = async () => await loader('experiences', routes.experiencesPath)
export const loadingPrices = async () => await loader('prices', routes.pricesPath)

export const getMentorById = (id) => mentors.find((el) => el.id === id)
export const getMentorBySlug = (slug) => mentors.find((el) => el.slug === slug)
