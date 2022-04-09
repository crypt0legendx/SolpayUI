import { JupiterProvider } from '@jup-ag/react-hook'
import { useEffect } from 'react'
import useMangoStore from '../stores/useMangoStore'
import PageBodyContainer from '../components/PageBodyContainer'
import TopBar from '../components/TopBar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  actionsSelector,
  connectionSelector,
  walletConnectedSelector,
  walletSelector,
} from '../stores/selectors'
import JupiterForm from '../components/JupiterForm'
import { zeroKey } from '@blockworks-foundation/mango-client'
import { useTranslation } from 'next-i18next'
import { PublicKey } from '@solana/web3.js'
import React from 'react';


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'swap'])),
      // Will be passed to the page component as props
    },
  }
}

export default function Swap() {
  const { t } = useTranslation(['common', 'swap'])
  const connection = useMangoStore(connectionSelector)
  const connected = useMangoStore(walletConnectedSelector)
  const wallet = useMangoStore(walletSelector)
  const actions = useMangoStore(actionsSelector)

  useEffect(() => {
    if (connected) {
      actions.fetchWalletTokens()
    }
  }, [connected])

  if (!connection) return null

  const userPublicKey =
    wallet?.publicKey && !zeroKey.equals(wallet.publicKey)
      ? wallet.publicKey
      : null


      const feeAccounts = new Map<string, PublicKey>();
      feeAccounts.set('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', new PublicKey('6jmm83Y9uZ5afsUdvRd7ydch9KFXYCKb76ErnzSDQnhf')); //USDC    WALLET
      feeAccounts.set('zwqe1Nd4eiWyCcqdo4FgCq7LYZHdSeGKKudv6RwiAEn', new PublicKey('6kXj4HqbomiTVcVZxSwZBvzkV15QV3gyQDrYqqeZTzMt')); //SOLPAY WALLET
      feeAccounts.set('So11111111111111111111111111111111111111112', new PublicKey('3RP5Xidy2vVE6CzgGrV8Hrb6zacGqCSfB6poDQ1SWKKA')); //SOL WALLET
      feeAccounts.set('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E', new PublicKey('7B2ZQwjcTSKWJZRh23x5RqrUdHeDL4yjJUkmhNLPryoa')); //BTC WALLET
      


      const platformFeeAndAccounts = {
        feeBps: 100, // 1% fee
        feeAccounts
      };

  return (
    <JupiterProvider
      connection={connection}
      cluster="mainnet-beta"
      userPublicKey={connected ? userPublicKey : null}
      platformFeeAndAccounts = {platformFeeAndAccounts}
    >
     
            
     
      <div className={`bg-th-bkg-1 text-th-fgd-1 transition-all ` }>
      
       <TopBar/>
        <PageBodyContainer>
        
          <div className="grid grid-cols-12 ">
            <div className="col-span-12 xl:col-span-10 xl:col-start-2 pt-8 pb-3 sm:pb-4 md:pt-10">
              <div className="flex flex-col items-start md:flex-row md:items-end md:justify-between mb-1 ">
                <h1
                  className={`mb-1.5 md:mb-0 text-th-fgd-1 text-2xl font-semibold `}
                >
                  {t('SolPay Swap')}
                </h1>
                <div className="flex flex-col md:items-end ">
                  <p className="mb-0 text-xs ">
                    {t('swap:swap-between-hundreds')}
                  </p>
                  <a
                    className="mb-0 text-th-fgd-2 text-xs"
                    href="https://jup.ag/swap/USDC-SOLPAY"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Powered by Jupiter
                  </a>
                </div>
              </div>
            </div>
          </div>
          {wallet ? <JupiterForm /> : null}
        </PageBodyContainer>
      </div>
    </JupiterProvider>
  )
}
