
'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../../globals.css";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {

    return (
        <div className='w-100' >
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <nav className="navbar navbar-expand-lg  px-4">
                        <div className="ms-auto flex flex-row items-center justify-center">
                            <AvatarDropdown />
                        </div>
                    </nav>
                </div>
            </nav>
        </div>
    )
}


function AvatarDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="position-relative d-inline-block" ref={dropdownRef}>
            {/* Avatar */}
            <button
                type="button"
                className="btn p-0 border-0 rounded-circle"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className='flex flex-row justify-center items-center' >
                    <div style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: "orange",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff"
                    }} >
                        <h4 style={{ marginBottom: 0 }} >AD</h4>
                    </div>
                    <span className="avatar flex flex-row items-center align-center">
                        {/* <img className="avatar-img" src="" alt="avatar" /> */}
                        <p className='text-white mb-0 ml-2'>Administrator</p>
                    </span>
                </div>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="card shadow border-0 position-absolute mt-2"
                    style={{
                        width: '250px',
                        right: 0,
                        top: '100%',
                        zIndex: 1050,
                    }}
                >
                    <div className="card-body">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <div style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                backgroundColor: "orange",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff"
                            }} >
                                <h4 style={{ marginBottom: 0 }} >AD</h4>
                            </div>

                            <div>
                                <div className="fw-bold">Administrator</div>
                                <small className="text-muted">
                                    admin@gmail.com
                                </small>
                            </div>
                        </div>

                        <hr />

                        <button onClick={() => {
                            localStorage.clear()
                            location.href = "/"
                        }} className="btn btn-light w-100 text-start text-danger">
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
