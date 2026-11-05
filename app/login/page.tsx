"use client"
import { useState } from "react"

import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiEye, FiEyeOff } from "react-icons/fi";

import LoginImage from "../assets/images/login-image.png"

export default function Login() {
  const [passwordShown, setPasswordShown] = useState<boolean>(true)

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex sm:flew-col flex-1 w-2xl max-h-2xl bg-white" >
          <div className="flex-1 flex flex-col justify-between pr-5" >
            <div>
              <h5 className="text-md">Aplikasi Pengelolaan Barang</h5>
              <p className="text-sm">PT JMC Indonesia</p>
            </div>
            <div>
              <h3>LOGIN</h3>
              <p className="text-sm" >Selamat datang, silahkan masukkan username dan password anda!</p>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group mb-3">
                <input type={passwordShown ? "password" : "text"} className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
                <div className="input-group-prepend" onClick={() => { setPasswordShown(!passwordShown) }} >
                  {passwordShown ? (
                    <span className="input-group-text h-100" id="basic-addon1"><FiEye /></span>) :
                    (<span className="input-group-text h-100" id="basic-addon1"><FiEyeOff /></span>
                    )}
                </div>
              </div>
            </div>
            <button onClick={() => {location.href = "/home"}} type="button" className="btn-main w-100">Login</button>
          </div>
          <div className="flex-1" >
            <Image alt="login image" src={LoginImage} style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </main>
    </div>
  );
}