import Image from 'next/image'
import Link from 'next/link'
import pluralize from '../lib/pluralize'
import { imageLoader } from '../lib/azure-image-loader'
import rub from '../lib/util.js'

export default function MentorsList(props) {
  const { mentors, hasMore, onClickMore } = props

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        {mentors.map((mentor) => (
          <Link key={mentor.id} href={'/mentor/' + mentor.slug}>
            <div target="_blank" className="link-image">
              <div className="aspect-w-5 aspect-h-4 bg-center bg-cover bg-no-repeat">
                <Image
                  src={imageLoader({ src: null || mentor.photoUrl, quality: 'large' })}
                  alt={mentor.name}
                  placeholder="blur"
                  blurDataURL={imageLoader({ src: null || mentor.photoUrl, quality: 'small' })}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="mt-3 mb-5">
                <div className="text-2xl mb-1">{mentor.name}</div>
                <div className="mb-2">
                  {mentor.job} @ {mentor.workplace}
                </div>

                <div>😎 {mentor.experience} лет опыта</div>
                <div>
                  💰 {mentor.price} {rub(mentor)}
                </div>
                {mentor.menteeCount > 0 && (
                  <div>
                    🤝 {mentor.menteeCount}{' '}
                    {pluralize(mentor.menteeCount, [
                      'человек получил помощь',
                      'человека получили помощь',
                      'человек получили помощь',
                    ])}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <button className="button" onClick={() => onClickMore()}>
            Посмотреть ещё
          </button>
        </div>
      )}
    </>
  )
}
