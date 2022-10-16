import React from 'react'
import { NextArrowIcon } from './NextArrowIcon'
import { NFTItem } from './NFTItem'

export const NFTList = ({ nfts, nextPage, changePage }) => {
  return (
    <>
      <div className='flex justify-end mb-4'>
        {nextPage && <div className='cursor-pointer w-7 h-7 shadow-gray-600/70 shadow-md rounded-full p-1 hover:shadow-black hover:shadow-md' onClick={changePage}><NextArrowIcon /></div>}
      </div>
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
