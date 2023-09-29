import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'

export default function Footer() {
  const router = useRouter()
  const { pathname, asPath, query, locale } = router

  const [selectedKeys, setSelectedKeys] = useState(new Set([]))

  useEffect(() => {
    const currentLocale = locale === 'ru' ? 'Русский 🇷🇺' : 'English 🇬🇧'

    setSelectedKeys(new Set(currentLocale))
  }, [locale])

  return (
    <footer className="bg-primary-100" data-section="footer">
      <div className="py-8 text-center text-sm">
        <div>
          <Link className="link" href="https://t.me/getmentor_dev">
            Telegram
          </Link>
          {' | '}
          <Link className="link" href="https://www.facebook.com/getmentor.dev">
            Facebook
          </Link>
          {' | '}
          <Link className="link" href="mailto:hello@getmentor.dev">
            Email
          </Link>
        </div>
        <div>
          <Link className="link" href="/privacy">
            Политика в отношении персональных данных
          </Link>
        </div>
        <div>
          <Link className="link" href="/disclaimer">
            Отказ от ответственности
          </Link>

          <Dropdown className="px-unit-2 py-unit-1 min-w-unit-3xl">
            <DropdownTrigger>
              <Button variant="light" color="primary">
                {selectedKeys}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <DropdownItem
                key="Русский"
                onClick={() => {
                  router.push({ pathname, query }, asPath, { locale: 'ru' })
                }}
              >
                Русский 🇷🇺
              </DropdownItem>

              <DropdownItem
                key="English"
                onClick={() => {
                  router.push({ pathname, query }, asPath, { locale: 'en' })
                }}
              >
                English 🇬🇧
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </footer>
  )
}

Footer.getInitialProps = async ({ query }) => {
  const { locale } = query
  return { locale }
}
