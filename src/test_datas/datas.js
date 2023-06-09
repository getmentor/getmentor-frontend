import axios from './axios.js'
import routes from './routes.js'
import state from './state.js'

const loadingMentors = async () => {
  state.mentors = []
  try {
    const result = await axios.get(routes.mentorsPath())
    state.mentors.push(...result.data.data.mentors)
    console.log(result.data.data.specializations)
  } catch (err) {
    console.log(err)
  }
}

export const getMentorById = (id) => state.mentors.find((el) => el.id === id)
export const getMentorBySlug = (slug) => state.mentors.find((el) => el.slug === slug)
export default loadingMentors
