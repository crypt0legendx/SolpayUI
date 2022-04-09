import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChartBarIcon} from '@heroicons/react/solid'
import { ChatIcon } from '@heroicons/react/outline'
import { NewspaperIcon } from '@heroicons/react/outline'

import { CashIcon } from '@heroicons/react/outline'
import { useTranslation } from 'next-i18next'

const StyledBarItemLabel = ({ children, ...props }) => (
  <div style={{ fontSize: '0.6rem', lineHeight: 1 }} {...props}>
    {children}
  </div>
)

const BottomBar = () => {
  const { t } = useTranslation('common')
  const { asPath } = useRouter()

  return (
    <>
      <div className="bg-th-bkg-1 default-transition grid grid-cols-4 grid-rows-1 py-2.5">
        <Link
          href={{
            pathname: '/swap',
          }}
        >
          <div
            className={`${
              asPath === '/swap' ? 'text-th-primary' : 'text-th-fgd-3'
            } col-span-1 cursor-pointer default-transition flex flex-col items-center hover:text-th-primary`}
          >
            <CashIcon className="h-4 mb-1 w-4" />
            <StyledBarItemLabel>{t('SolPay Swap')}</StyledBarItemLabel>
          </div>
        </Link>
        <Link
          href={{
            pathname: 'https://twitter.com/SolPayDeFi',
          }}
          shallow={true}
        >
          <div
            className={`${
              asPath === '/' || asPath.startsWith('https://twitter.com/SolPayDeFi')
                ? 'text-th-primary'
                : 'text-th-fgd-3'
            } col-span-1 cursor-pointer default-transition flex flex-col items-center hover:text-th-primary`}
          >
            <NewspaperIcon className="h-4 mb-1 w-4" />
            <StyledBarItemLabel>{t('Twitter')}</StyledBarItemLabel>
          </div>
        </Link>
        <Link href="https://t.me/solpaydefi" shallow={true}>
          <div
            className={`${
              asPath === '/' ? 'text-th-primary' : 'text-th-fgd-3'
            } col-span-1 cursor-pointer default-transition flex flex-col items-center hover:text-th-primary`}
          >
            <ChatIcon className="h-4 mb-1 w-4" />
            <StyledBarItemLabel>{t('Telegram')}</StyledBarItemLabel>
          </div>
        </Link>
        <Link href="https://solpayscan.io" shallow={true}>
          <div
            className={`${
              asPath === '/' ? 'text-th-primary' : 'text-th-fgd-3'
            } col-span-1 cursor-pointer default-transition flex flex-col items-center hover:text-th-primary`}
          >
            <ChartBarIcon className="h-4 mb-1 w-4" />
            <StyledBarItemLabel>{t('SolPay Scan')}</StyledBarItemLabel>
          </div>
        </Link>
      </div>
    </>
  )
}

export default BottomBar
