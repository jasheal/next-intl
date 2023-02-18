import { Link, useTranslations } from 'next-intl'
import Image from 'next/image'
import ClientRouterWithoutProvider from '../../components/ClientRouterWithoutProvider'
import CoreLibrary from '../../components/CoreLibrary'
import CurrentTime from '../../components/CurrentTime'
import LocaleSwitcher from '../../components/LocaleSwitcher'
import PageLayout from '../../components/PageLayout'
import MessagesAsPropsCounter from '../../components/client/01-MessagesAsPropsCounter'
import MessagesOnClientCounter from '../../components/client/02-MessagesOnClientCounter'

type Props = {
  searchParams: Record<string, string>
}

export default function Index({ searchParams }: Props) {
  const t = useTranslations('Index')

  return (
    <PageLayout title={t('title')}>
      <p>{t('description')}</p>
      <p data-testid="RichText">
        {t.rich('rich', { important: (chunks) => <b>{chunks}</b> })}
      </p>
      <Image src="/kitten.jpeg" width={100} height={80} alt="no kittens :(" />
      <p
        dangerouslySetInnerHTML={{ __html: t.raw('rich') }}
        data-testid="RawText"
      />
      <p data-testid="GlobalDefaults">{t.rich('globalDefaults')}</p>
      {/* @ts-expect-error Purposefully trigger an error */}
      <p data-testid="MissingMessage">{t('missing')}</p>
      <CurrentTime />
      <LocaleSwitcher />
      <MessagesAsPropsCounter />
      {/* @ts-expect-error RSC are not supported yet by TypeScript */}
      <MessagesOnClientCounter />
      <CoreLibrary />
      <ClientRouterWithoutProvider />
      <div>
        <Link href={{ pathname: '/', query: { test: true } }}>
          Go to home with query param
        </Link>
      </div>
      <p data-testid="SearchParams">{JSON.stringify(searchParams, null, 2)}</p>
    </PageLayout>
  )
}
