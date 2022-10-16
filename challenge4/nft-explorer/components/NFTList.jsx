import React from 'react'
import { NFTItem } from './NFTItem'

export const NFTList = ({ nfts }) => {
  return (
    <>
      <section className="grid grid-cols-6 gap-6 mb-4">
        {nfts.length > 0 &&
          nfts.map(nft => {
            return <NFTItem key={nft.tokenUri.gateway} {...nft}/>
          })
        }
      </section>
      {nfts.length === 0 && <h2 className='text-4xl font-bold text-center'>No Data Displayed</h2>}
    </>
  )
}
