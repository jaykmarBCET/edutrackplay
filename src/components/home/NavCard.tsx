// components/NavCard.tsx
import React from 'react'
import Link from 'next/link'
import { IconType } from 'react-icons'

interface NavCardProps {
  name: string
  icon: IconType
  href: string
  color?: string
}

const NavCard: React.FC<NavCardProps> = ({ name, icon: Icon, href, color = 'text-blue-600' }) => {
  return (
    <Link href={href} className='bg-white shadow-md rounded-xl p-5 text-center hover:shadow-lg transition w-40'>
      <div className='flex flex-col items-center'>
        <Icon size={36} className={`${color} mb-2`} />
        <span className='text-md font-medium text-gray-800'>{name}</span>
      </div>
    </Link>
  )
}

export default NavCard
