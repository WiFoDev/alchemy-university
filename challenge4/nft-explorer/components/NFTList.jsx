import React from 'react'
import iconEth from '../public/icon-ethereum.svg'
import iconClock from '../public/icon-clock.svg'
import Image from 'next/image'

export const NFTList = ({ nfts }) => {
  return (
    <section className="border-2 grid grid-cols-2">
      <div className='min-h-[22rem] p-6  bg-[#14253d] rounded-2xl text-white'>
        <picture className='h-1/2 rounded'>
          <Image layout='responsive' width='100%' height='100%' src="https://img.seadn.io/files/ad83dac8699f759e6d6ffa961c04e1e5.png?fit=max&w=1000" alt="Some random alt"/>
        </picture>
        <h2 className='text-xl font-semibold'>Equilibrium #3429</h2>
        <p>Our description for this nft to be promote.</p>
        <div className='flex justify-between'>
          <div className='flex'><Image layout='responsive' width='100%' height='100%' src={iconEth} alt='ethereum icon'/><span>price</span></div>
          <div className='flex'><Image layout='responsive' width='100%' height='100%' src={iconClock} alt='ethereum icon'/><span>publication</span></div>
        </div>
        <hr className='border-[#2f415b]'/>
        <p>Contract Address</p>
      </div>
    </section>
  )
}
