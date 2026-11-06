"use client"

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./login/page";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './home/page';

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true)
  const [isLogin, setIsLogin] = useState<boolean>(false)

  useEffect(() => {
    checkLogin()
  },[])

  async function checkLogin() {
    try {
      const token = localStorage.getItem("token")

      const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "user/check-login", {
        token,
      });

      if (response.status == 200 || response.status == 201) {
        setLoading(false)
        setIsLogin(true)
      } else {
        setLoading(false)
        setIsLogin(false)
      }

      // console.log("Full response:", response);
      // console.log("Data only:", response.data);
    } catch (error: any) {
      setLoading(false)
      console.log("Error response:", error?.response);
    }
  }

  if(loading){
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (isLogin) {
    return (
      <Home />
    );
  }

  return (
    <Login />
  );
}
