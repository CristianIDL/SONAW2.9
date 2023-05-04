import "./homeAdmin.css"
import Feed from "../../components/feed/Feed";
import SidebarAdmin from "../../components/sidebarAdmin/SidebarAdmin";
import TopbarAdmin from "../../components/topbarAdmin/TopbarAdmin";
import { useEffect, useState } from "react";
import Autenticado from "../../components/Autenticado/Auntenticado";
import jwt_decode from "jwt-decode"
import axios from "axios";
import { IP } from "../../IP";

export default function Home() {
  const [userId,setUserId]=useState("")
  const [user,setUser]=useState("")
  console.log(user);
  useEffect(()=>{
    const getUser=async ()=>{
      const token= window.localStorage.getItem("token")
      const decodedToken=jwt_decode(token)
      setUserId(decodedToken.id)
    try {
            const res=await axios.get(`http://${IP}:9000/api/users?userId=${userId}`)
            setUser(res.data);
          } catch (error) {
            console.log("ERROR EN INICIO ADMIN");
            console.log(error);
          }
  }
  getUser()
},[userId])

  return (
    <>
    <Autenticado>
      <TopbarAdmin />
      <div className="homeContainer">      
        <SidebarAdmin />
        <div className="homefeed">
          <Feed />
        </div>
      </div>
    </Autenticado>
    </>
  )
}
