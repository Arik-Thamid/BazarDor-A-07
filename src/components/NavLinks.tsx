
import Link from 'next/link';
import React from 'react';

const NavLinks = async () => {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories')
    const data = await res.json()
    console.log(data)
    return (
        <div className='flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-100 overflow-x-auto'>
            <div className='flex items-center gap-1'>
                {
                    data.map((navlinks: { id: string | number; icon: string; nameBn: string }) => <div className='flex' key={navlinks.id}>
                        <Link className='flex items-center gap-2 py-2 whitespace-nowrap px-4 rounded-lg hover:bg-gray-200' href='/'>
                            <p>{navlinks.icon}</p>
                            <p>{navlinks.nameBn}</p>
                        </Link>
                    </div>)
                }
            </div>
        </div>
    );
};

export default NavLinks;