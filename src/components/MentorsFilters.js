import classNames from 'classnames'
import analytics from '../lib/analytics'
import { useEffect } from 'react'
import FilterGroupDropdown from './FilterGroupDropdown'
import makeFilters from '../config/makeFilter'

export default function MentorsFilters(props) {
  const { specializations, prices, experiences } = props

  const defaultProps = {
    tags: [],
    experiences: [],
    allowSponsors: true,
  }

  const allFilters = makeFilters(specializations, prices, experiences)

  const { allowSponsors, appliedFilters } = { ...defaultProps, ...props }

  useEffect(() => {
    if (window?.location?.hash?.startsWith('#tags:')) {
      let data = window?.location?.hash.split(':')
      let newTags = data[1] ? data[1].split('|').map((t) => decodeURI(t)) : []
      newTags = newTags.filter(
        (item) => allFilters.tags.includes(item) || allFilters.sponsors.includes(item)
      )

      appliedFilters.tags.set(newTags)

      if (newTags.length > 0) {
        analytics.event('Landed With Selected Tags', {
          tags: newTags,
        })
      }
    }
  }, [])

  const onResetAll = () => {
    appliedFilters.tags.reset()
    appliedFilters.experience.reset()
    appliedFilters.price.reset()

    analytics.event('Reset All Filters')
    history.replaceState(null, null, '#')
  }

  const onClickTag = (tag) => {
    const newTags = onClickFilterMultiple(tag, appliedFilters.tags, {
      onRemove: 'Filter Removed Tag',
      onAdd: 'Filter Added Tag',
    })

    history.replaceState(null, null, '#tags:' + newTags.join('|'))
  }

  const onClickExperience = (experience) => {
    onClickFilterMultiple(experience, appliedFilters.experience, {
      onRemove: 'Filter Removed Experience',
      onAdd: 'Filter Added Experience',
    })
  }

  const onClickPrice = (price) => {
    onClickFilterSingle(price, appliedFilters.price, {
      onRemove: 'Filter Removed Price',
      onAdd: 'Filter Added Price',
    })
  }

  const onClickFilterMultiple = (newValue, filter, analyticsEvents) => {
    let newValues = []

    if (filter.values.includes(newValue)) {
      newValues = filter.values.filter((item) => item !== newValue)

      analytics.event(analyticsEvents.onRemove, {
        tagName: newValue,
      })
    } else {
      newValues = [...filter.values, newValue]

      analytics.event(analyticsEvents.onAdd, {
        tagName: newValue,
      })
    }

    filter.set(newValues)

    return newValues
  }

  const onClickFilterSingle = (newValue, filter, analyticsEvents) => {
    if (filter.values === newValue) {
      filter.set(undefined)

      analytics.event(analyticsEvents.onRemove, {
        tagName: newValue,
      })
    } else {
      filter.set(newValue)

      analytics.event(analyticsEvents.onAdd, {
        tagName: newValue,
      })
    }

    return newValue
  }

  return (
    <div className="text-center">
      <ul className="flex flex-wrap justify-left -m-1 mb-3">
        {allowSponsors && (
          <>
            {allFilters.sponsors.map((tag) => {
              const isActive = appliedFilters.tags.values.includes(tag)

              return (
                <li
                  className={classNames('text-sm rounded-full py-1 px-4 m-1 cursor-pointer', {
                    'bg-indigo-200 hover:bg-indigo-300 text-gray-600': !isActive,
                    'bg-indigo-700 text-white': isActive,
                  })}
                  key={tag}
                  onClick={() => onClickTag(tag)}
                >
                  {tag}
                </li>
              )
            })}
          </>
        )}
        {Object.keys(allFilters.byTags).map((key) => {
          if (key !== 'rest') {
            return (
              <li key={key}>
                <FilterGroupDropdown
                  title={key}
                  values={allFilters.byTags[key]}
                  onFilterSelect={onClickTag}
                  allSelectedValues={appliedFilters.tags.values}
                />
              </li>
            )
          }
        })}

        {allFilters.byTags.rest.map((tag) => {
          const isActive = appliedFilters.tags.values.includes(tag)

          return (
            <li
              className={classNames('text-sm rounded-full py-1 px-4 m-1 cursor-pointer', {
                'bg-gray-300 hover:bg-gray-200 text-gray-600': !isActive,
                'bg-gray-700 text-white': isActive,
              })}
              key={tag}
              onClick={() => onClickTag(tag)}
            >
              {tag}
            </li>
          )
        })}
      </ul>

      <hr />

      <ul className="flex flex-wrap justify-left -mx-1 mb-1 mt-1">
        <li>
          <FilterGroupDropdown
            title="Опыт"
            values={Object.keys(allFilters.experience)}
            onFilterSelect={onClickExperience}
            allSelectedValues={appliedFilters.experience.values}
            theme="block"
          />
        </li>

        <li>
          <FilterGroupDropdown
            title="Цена"
            values={Object.keys(allFilters.selectPrice)}
            onFilterSelect={onClickPrice}
            allSelectedValues={appliedFilters.price.values}
            multiSelect={false}
            theme="block"
          />
        </li>

        <li
          className="text-sm rounded-sm py-1 px-4 m-1 cursor-pointer bg-primary-900 hover:bg-red-500 text-white"
          key="reset"
          onClick={onResetAll}
        >
          Сбросить все
        </li>
      </ul>
    </div>
  )
}
