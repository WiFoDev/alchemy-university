import React from 'react'
import iconEth from '../public/icon-ethereum.svg'
import iconClock from '../public/icon-clock.svg'
import Image from 'next/image'

export const NFTItem = ({ media, title, contractMetadata, contract }) => {
  const shortAddress = (address) => {
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`
  }

  return (
    <div className='min-h-[22rem] p-6  bg-[#14253d] rounded-2xl text-[#8bacda] flex flex-col gap-3 shadow-gray-500 shadow-lg'>
        <img
          src={media[0].gateway}
          alt="Some random alt"
          className='rounded-lg'
        />
        <h2 className='text-lg font-semibold text-white'>{title}</h2>
        <p>Collection Name: {contractMetadata.name}</p>
        <div className='flex justify-between'>
          <div className='flex items-center gap-1'>
            <Image layout='fixed' width='15px' height='20px' src={iconEth} alt='ethereum icon'/>
            <span className='text-[#00fff7]'>ETH</span>
          </div>
          <div className='flex items-center gap-1'>
            <Image layout='fixed' width='20px' height='20px' src={iconClock} alt='ethereum icon'/>
            <span>3 days left</span>
          </div>
        </div>
        <hr className='border-[#2f415b]'/>
        <p>Contract Address: {shortAddress(contract.address)}</p>
      </div>
  )
}
