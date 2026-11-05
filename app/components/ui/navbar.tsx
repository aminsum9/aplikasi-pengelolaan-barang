
'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../../globals.css";

export default function Navbar() {

    return (
        <div className='w-100' >
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <span className="avatar flex flex-row items-center align-center">
                        {/* <img className="avatar-img" src="" alt="avatar" /> */}
                        <p className='text-white mb-0 ml-2'>Administrator</p>
                    </span>
                </div>
            </nav>
        </div>
    )
}