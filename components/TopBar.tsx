import { useCallback, useState } from 'react'
import Link from 'next/link'
import { abbreviateAddress } from '../utils/index'
import MenuItem from './MenuItem'
import ThemeSwitch from './ThemeSwitch'
import useMangoStore from '../stores/useMangoStore'
import ConnectWalletButton from './ConnectWalletButton'
import AccountsModal from './AccountsModal'
import LanguageSwitch from './LanguageSwitch'

// import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'



const TopBar = () => {
  const { t } = useTranslation('common')
  const mangoAccount = useMangoStore((s) => s.selectedMangoAccount.current)
  const wallet = useMangoStore((s) => s.wallet.current)
  const [showAccountsModal, setShowAccountsModal] = useState(false)

  const handleCloseAccounts = useCallback(() => {
    setShowAccountsModal(false)
  }, [])

  return (
    <>
      <nav className={`bg-th-bkg-2 border-b border-th-bkg-2`}>
        <div className={`px-4 lg:px-10`}>
          <div className={`flex justify-between h-14`}>
            <div className={`flex`}>
              <Link href="/swap" shallow={true}>
                <div
                  className={`cursor-pointer flex-shrink-0 flex items-center`}
                >
                  <img
                    className={`h-18 w-20`}
                    src="/assets/icons/logo.png"
                    alt="SolPay"
                  />
                </div>
              </Link>
              <div
                className={`hidden md:flex md:items-center md:space-x-4 lg:space-x-6 md:ml-20`}
              >
                <MenuItem href="/swap">{t('swap')}</MenuItem>
                 <MenuItem href="https://twitter.com/SolPayDeFi" newWindow>
                  {t('Twitter')}
                </MenuItem>
                <MenuItem href="https://t.me/solpaydefi" newWindow>
                  {t('Telegram')}
                </MenuItem>
                
                {/* <button
                  onClick={() => {
                    handleLocaleChange('en')
                  }}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    handleLocaleChange('zh')
                  }}
                >
                  简体中文
                </button>
                <button
                  onClick={() => {
                    handleLocaleChange('zh_tw')
                  }}
                >
                  繁體中文
                </button> */}
              </div>
            </div>
            <div className="flex items-center">
              <div className={`pl-2`}>
                <LanguageSwitch />
              </div>
              <div className={`pl-2`}>
                <ThemeSwitch />
              </div>
              {mangoAccount &&
              mangoAccount.owner.toBase58() ===
                wallet?.publicKey?.toBase58() ? (
                <div className="pl-2">
                  <button
                    className="border border-th-bkg-4 py-1 px-2 rounded text-xs focus:outline-none hover:border-th-fgd-4"
                    onClick={() => setShowAccountsModal(true)}
                  >
                    <div className="font-normal text-th-primary text-xs">
                      {t('account')}
                    </div>
                    {mangoAccount.name
                      ? mangoAccount.name
                      : abbreviateAddress(mangoAccount.publicKey)}
                  </button>
                </div>
              ) : null}
              <div className="flex">
                <div className="pl-2">
                  <ConnectWalletButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {showAccountsModal ? (
        <AccountsModal
          onClose={handleCloseAccounts}
          isOpen={showAccountsModal}
        />
      ) : null}
    </>
  )
}

export default TopBar
