import Image from 'next/image';
import React from 'react';
import NavLinks from './NavLinks';
import Link from 'next/link';


const Header = () => {
    const date = new Date().toLocaleDateString('bn-BD', {
        dateStyle: 'full',
    });

    return (
        <div className='bg-white'>
            <div className='flex  items-center justify-between gap-3 px-4 py-3 border-b border-gray-100 max-w-7xl mx-auto'>
                <div className='flex justify-center items-center gap-2'>
                    <Image
                        className='bg-green-700 p-3 rounded-2xl '
                        src='/logo-icon.png'
                        width={50}
                        height={50}
                        alt='Bazar Dor logo'
                    />
                    <div>
                        <h1 className='text-xl font-bold'>বাজার দর</h1>
                        <p className='text-[16px] text-gray-600'>{date}</p>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <Link href='/signin'><button className='px-3 py-2 rounded-lg hover:bg-gray-300'>সাইন ইন</button></Link>
                    <Link href='/signup'><button className='px-3 py-2 rounded-lg hover:bg-green-700 bg-green-500'>সাইন আপ</button></Link>
                   
                </div>
            </div>
            <div className='max-w-7xl mx-auto'>

            <NavLinks />
            </div>
        </div>
    );
};

export default Header;