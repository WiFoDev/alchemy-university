import Head from 'next/head'
import React from 'react'

export const Layout = ({ children }) => {
  return (
    <div className='min-h-screen grid'>
      <Head>
        <title>NFT Explorer</title>
        <meta name="description" content="The best nft explorer app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full px-12">
        {children}
      </main>
    </div>
  )
}
