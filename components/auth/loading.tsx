import Image from 'next/image'
import React from 'react'

export const Loading = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
        <Image src="/logo.svg" alt="loading" width={100} height={100} className='animate-pulse duration-700' />
    </div>
  )
}
