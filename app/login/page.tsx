"use client"
import { useEffect, useState } from "react"

import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiEye, FiEyeOff } from "react-icons/fi";

import LoginImage from "../assets/images/login-image.png"
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [passwordShown, setPasswordShown] = useState<boolean>(true)

  async function handleLogin() {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "user/login", {
          username, password
      });

      if(response.status == 200 || response.status == 201){
        localStorage.setItem("token",response?.data?.data?.token)
        localStorage.setItem("api_token",response?.data?.token)
        localStorage.setItem("username",response?.data?.data?.username)
        localStorage.setItem("name",response?.data?.data?.name)
        location.href = "/home"
      } else {

      }

      // console.log("Full response:", response);
      // console.log("Data only:", response.data);
    } catch (error: any) {
      console.log("Error response:", error?.response);
    }
  }

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
                <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group mb-3">
                <input onChange={(e) => setPassword(e.target.value)} type={passwordShown ? "password" : "text"} className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
                <div className="input-group-prepend" onClick={() => { setPasswordShown(!passwordShown) }} >
                  {passwordShown ? (
                    <span className="input-group-text h-100" id="basic-addon1"><FiEye /></span>) :
                    (<span className="input-group-text h-100" id="basic-addon1"><FiEyeOff /></span>
                    )}
                </div>
              </div>
            </div>
            <button onClick={() => { handleLogin() }} type="button" className="btn-main w-100">Login</button>
          </div>
          <div className="flex-1" >
            <Image loading="eager" alt="login image" src={LoginImage} style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </main>
    </div>
  );
}