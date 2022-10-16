import React from 'react'
import { Ring } from '@uiball/loaders'
import { NextArrowIcon } from './NextArrowIcon'
import { NFTItem } from './NFTItem'

export const NFTList = ({ nfts, nextPage, changePage, isLoading }) => {
  const content = !isLoading
    ? (<>
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
        {nfts.length === 0 && !isLoading && <h2 className='text-4xl font-bold text-center'>No Data Displayed</h2>}
      </>)
    : (<div className='grid place-items-center'>
      <Ring
        size={60}
        lineWeight={5}
        speed={2}
        color="black"
      />
    </div>
      )

  return (
    <>{ content }</>
  )
}
