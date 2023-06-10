const root = ''
const apiPath = 'api'

export default {
  mentorsPath: () => [root, apiPath, 'mentors'].join('/'),
  specializationsPath: () => [root, apiPath, 'specializations'].join('/'),
  experiencesPath: () => [root, apiPath, 'experiences'].join('/'),
  pricesPath: () => [root, apiPath, 'prices'].join('/'),
}
