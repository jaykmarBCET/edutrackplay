import React from 'react'
import Link from 'next/link';

function EduSyncCard({href,className="",name="logn"}:{href:string;className:string;name:string}) {
  return (
    <Link href={href} className={` border border-gray-400 px-6 py-1 bg-blue-500 rounded-2xl ${className}`}>
        <p className='text-xl px-4 py-2'>{name}</p>
    </Link>
  )
}

export default EduSyncCard