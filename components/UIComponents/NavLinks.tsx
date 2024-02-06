import React from 'react'
import {links} from '@/utils/links';
import Link from 'next/link';

const NavLinks = () => {
    return (
        <ul className="menu text-base-content text-xl">
            {
                links.map((linkItem) => {
                    return <li key={linkItem.href}>
                        <Link href={linkItem.href} className="capitalize">
                            {linkItem.label}
                        </Link>
                    </li>
                })
            }
        </ul>
    )
}
export default NavLinks
