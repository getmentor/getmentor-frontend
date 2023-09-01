import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

export default function Footer() {
  const router = useRouter()
  const { t } = useTranslation(['common', 'form'])

  const { pathname, asPath, query } = router

  return (
    <footer className="bg-primary-100" data-section="footer">
      <div className="py-8 text-center text-sm">
        <div>
          <a className="link" href="https://t.me/getmentor_dev" target="_blank" rel="noreferrer">
            Telegram
          </a>
          {' | '}
          <a
            className="link"
            href="https://www.facebook.com/getmentor.dev"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          {' | '}
          <a className="link" href="mailto:hello@getmentor.dev">
            Email
          </a>
        </div>
        <div>
          <Link href="/privacy">
            <div className="link">Политика в отношении персональных данных</div>
          </Link>
        </div>
        <div>
          <Link href="/disclaimer">
            <div className="link">Отказ от ответственности</div>
          </Link>

          <DropdownButton
            variant="outline-white"
            size="sm"
            drop="end"
            className="border-0"
            id="dropdown-item-button"
            title={t('common:languageSwitcher')}
          >
            <Dropdown.Item
              as="button"
              onClick={() => {
                router.push({ pathname, query }, asPath, { locale: 'ru' })
              }}
            >
              Русский
            </Dropdown.Item>

            <Dropdown.Item
              as="button"
              onClick={() => {
                router.push({ pathname, query }, asPath, { locale: 'en' })
              }}
            >
              English
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </footer>
  )
}
