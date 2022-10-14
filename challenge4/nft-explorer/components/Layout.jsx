import Head from 'next/head'
import React from 'react'

export const Layout = () => {
  return (
    <div className='min-h-screen grid'>
      <Head>
        <title>NFT Explorer</title>
        <meta name="description" content="The best nft explorer app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full px-12">
        <section className="border-2 h-1/3">form</section>
        <section className="border-2">Galery</section>
      </main>
    </div>
  )
}
