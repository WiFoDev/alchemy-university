import React from 'react'
import { NFTItem } from './NFTItem'

export const NFTList = ({ nfts, nextPage, changePage }) => {
  return (
    <>
      {nextPage && <a className='underline cursor-pointer' onClick={changePage}>Next Page</a>}
      <section className="grid grid-cols-6 gap-6 mb-4">
        {nfts.length > 0 &&
          nfts.map((nft, index) => {
            return <NFTItem key={index} {...nft}/>
          })
        }
      </section>
      {nfts.length === 0 && <h2 className='text-4xl font-bold text-center'>No Data Displayed</h2>}
    </>
  )
}
