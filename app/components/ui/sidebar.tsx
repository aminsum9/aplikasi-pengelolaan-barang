
'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import "../../globals.css";
import { BsBoxArrowInDown } from 'react-icons/bs';
import type {IconType} from 'react-icons';
import { BiBookmark } from 'react-icons/bi';
import { MdPeople } from 'react-icons/md';
import { CgChevronDown, CgChevronUp } from 'react-icons/cg';
import 'bootstrap/dist/css/bootstrap.min.css';

const BoxArrowInDownIcon: IconType = BsBoxArrowInDown

function Content() {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname.includes(path);

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h5 className='text-sm' >Aplikasi Pengelolaan Barang</h5>
            </div>

            <nav className="sidebar-menu">
                {/* Barang Masuk */}
                <Link
                    href="/home"
                    className={`sidebar-item ${isActive('/home') ? 'active' : ''}`}
                >
                    <div className='flex flex-row text-center items-center justify-center' >
                        <BoxArrowInDownIcon />
                        <p className='ml-2 mb-0' >Barang Masuk</p>
                    </div>
                </Link>

                {/* Dropdown Menu */}
                <button
                    type="button"
                    className={`sidebar-item sidebar-dropdown ${dropdownOpen ? 'active' : ''
                        }`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <span>
                        <BiBookmark />
                        <p className='ml-2 mb-0' >Master Data</p>
                    </span>
                    {dropdownOpen ? (<CgChevronUp />) : (<CgChevronDown />)}
                </button>

                {/* Dropdown Items */}
                {dropdownOpen && (
                    <div className="sidebar-submenu">
                        <Link
                            href="/master-data/category"
                            className={`sidebar-subitem ${isActive('/master-data/category') ? 'active' : ''
                                }`}
                        >
                            Kategori
                        </Link>

                        <Link
                            href="/master-data/sub-category"
                            className={`sidebar-subitem ${isActive('/master-data/sub-category') ? 'active' : ''
                                }`}
                        >
                            Sub Kategori
                        </Link>
                    </div>
                )}

                {/* Manajemen Users */}
                <Link
                    href="/management-users"
                    className={`sidebar-item ${isActive('/management-users') ? 'active' : ''
                        }`}
                >
                    <div className='flex flex-row items-center justify-center' >
                        <MdPeople />
                        <p className='ml-2 mb-0' >Manajemen Users</p>
                    </div>
                </Link>
            </nav>
        </aside>
    );
}

export default function Sidebar() {
    return(
         <Suspense fallback={<div>Loading...</div>}>
            <Content />
         </Suspense>
    )
}